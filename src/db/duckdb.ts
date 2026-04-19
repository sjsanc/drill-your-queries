import type { AsyncDuckDBConnection } from "@duckdb/duckdb-wasm";
import * as duckdb from "@duckdb/duckdb-wasm";
import type { IDbEngine, QueryResult } from "@/types/engine";
import type { SchemaTable } from "@/types/schema";

export class DuckdbEngine implements IDbEngine {
    readonly id = "duckdb" as const;
    private conn: AsyncDuckDBConnection | null = null;
    private db: duckdb.AsyncDuckDB | null = null;

    async init(): Promise<void> {
        const bundles = duckdb.getJsDelivrBundles();
        const bundle = await duckdb.selectBundle(bundles);
        const workerUrl = URL.createObjectURL(
            new Blob([`importScripts("${bundle.mainWorker}");`], {
                type: "text/javascript",
            }),
        );
        const worker = new Worker(workerUrl);
        this.db = new duckdb.AsyncDuckDB(new duckdb.ConsoleLogger(), worker);
        await this.db.instantiate(bundle.mainModule, bundle.pthreadWorker);
        this.conn = await this.db.connect();
    }

    async exec(sql: string): Promise<void> {
        if (!this.conn) throw new Error("Engine not initialised");
        await this.conn.query(sql);
    }

    async query(sql: string): Promise<QueryResult> {
        if (!this.conn) throw new Error("Engine not initialised");
        const table = await this.conn.query(sql);
        const columns = table.schema.fields.map((f) => f.name);
        const rows = table
            .toArray()
            .map((row) =>
                Object.fromEntries(columns.map((col) => [col, row[col]])),
            );
        return { columns, rows };
    }

    async introspect(): Promise<SchemaTable[]> {
        if (!this.conn) throw new Error("Engine not initialised");
        const tables = await this.conn.query(
            `SELECT table_name FROM information_schema.tables
             WHERE table_schema = 'main' AND table_type = 'BASE TABLE'
             ORDER BY table_name`,
        );
        const tableNames = tables.toArray().map((r) => r.table_name as string);
        return Promise.all(
            tableNames.map(async (name) => {
                const cols = await this.conn!.query(
                    `SELECT column_name, data_type FROM information_schema.columns
                     WHERE table_schema = 'main' AND table_name = '${name}'
                     ORDER BY ordinal_position`,
                );
                return {
                    name,
                    columns: cols.toArray().map((r) => ({
                        name: r.column_name as string,
                        type: (r.data_type as string).toUpperCase(),
                    })),
                };
            }),
        );
    }

    async destroy(): Promise<void> {
        await this.conn?.close();
        await this.db?.terminate();
        this.conn = null;
        this.db = null;
    }
}

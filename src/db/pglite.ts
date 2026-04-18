import { PGlite } from "@electric-sql/pglite";
import type { IDbEngine, QueryResult } from "../types/engine";
import type { SchemaTable } from "../types/schema";

export class PgliteEngine implements IDbEngine {
    readonly id = "pg" as const;
    private db: PGlite | null = null;

    async init(): Promise<void> {
        this.db = new PGlite();
    }

    async exec(sql: string): Promise<void> {
        if (!this.db) throw new Error("Engine not initialised");
        await this.db.exec(sql);
    }

    async query(sql: string): Promise<QueryResult> {
        if (!this.db) throw new Error("Engine not initialised");
        const result = await this.db.query(sql);
        return {
            columns: result.fields.map((f) => f.name),
            rows: result.rows as Record<string, unknown>[],
        };
    }

    async introspect(): Promise<SchemaTable[]> {
        if (!this.db) throw new Error("Engine not initialised");
        const tables = await this.db.query<{ table_name: string }>(
            `SELECT table_name FROM information_schema.tables
             WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
             ORDER BY table_name`,
        );
        return Promise.all(
            tables.rows.map(async ({ table_name }) => {
                const cols = await this.db!.query<{
                    column_name: string;
                    data_type: string;
                }>(
                    `SELECT column_name, data_type FROM information_schema.columns
                     WHERE table_schema = 'public' AND table_name = $1
                     ORDER BY ordinal_position`,
                    [table_name],
                );
                return {
                    name: table_name,
                    columns: cols.rows.map((r) => ({
                        name: r.column_name,
                        type: r.data_type.toUpperCase(),
                    })),
                };
            }),
        );
    }

    async destroy(): Promise<void> {
        await this.db?.close();
        this.db = null;
    }
}

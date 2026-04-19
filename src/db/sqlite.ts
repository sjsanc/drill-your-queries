import type { Database } from "sql.js";
import initSqlJs from "sql.js";
import sqlWasm from "sql.js/dist/sql-wasm.wasm?url";
import type { IDbEngine, QueryResult } from "@/types/engine";
import type { SchemaTable } from "@/types/schema";

export class SqliteEngine implements IDbEngine {
    readonly id = "sqlite" as const;
    private db: Database | null = null;

    async init(): Promise<void> {
        const SQL = await initSqlJs({ locateFile: () => sqlWasm });
        this.db = new SQL.Database();
    }

    async exec(sql: string): Promise<void> {
        if (!this.db) throw new Error("Engine not initialised");
        this.db.exec(sql);
    }

    async query(sql: string): Promise<QueryResult> {
        if (!this.db) throw new Error("Engine not initialised");
        const results = this.db.exec(sql);
        if (results.length === 0) return { columns: [], rows: [] };
        const { columns, values } = results[0];
        return {
            columns,
            rows: values.map((row) =>
                Object.fromEntries(columns.map((col, i) => [col, row[i]])),
            ),
        };
    }

    async introspect(): Promise<SchemaTable[]> {
        if (!this.db) throw new Error("Engine not initialised");
        const tableRows = this.db.exec(
            `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name`,
        );
        if (tableRows.length === 0) return [];
        const tableNames = tableRows[0].values.map((r) => r[0] as string);
        return tableNames.map((name) => {
            const info = this.db!.exec(`PRAGMA table_info(${name})`);
            const columns =
                info.length > 0
                    ? info[0].values.map((r) => ({
                          name: r[1] as string,
                          type: r[2] as string,
                      }))
                    : [];
            return { name, columns };
        });
    }

    async destroy(): Promise<void> {
        this.db?.close();
        this.db = null;
    }
}

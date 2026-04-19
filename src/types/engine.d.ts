import type { SchemaTable } from "@/types/schema";

export type EngineId = "sqlite" | "pg" | "duckdb";

export interface QueryResult {
    columns: string[];
    rows: Record<string, unknown>[];
}

export interface IDbEngine {
    readonly id: EngineId;
    init(): Promise<void>;
    exec(sql: string): Promise<void>;
    query(sql: string): Promise<QueryResult>;
    introspect(): Promise<SchemaTable[]>;
    destroy(): Promise<void>;
}

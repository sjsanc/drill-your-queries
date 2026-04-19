import { format } from "sql-formatter";
import type { EngineId } from "../types/engine";

/** Formats a SQL string using the dialect appropriate for the given engine. */
export function formatQuery(sql: string, engineId: EngineId): string {
    return format(sql, {
        language: engineId === "sqlite" ? "sqlite" : "postgresql",
        tabWidth: 4,
        keywordCase: "upper",
    });
}

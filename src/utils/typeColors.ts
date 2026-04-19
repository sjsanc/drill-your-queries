import type { EngineId } from "@/types/engine";

type ColorMap = Record<string, string>;

const sqliteColors: ColorMap = {
    INTEGER: "text-purple-500",
    REAL: "text-blue-500",
    TEXT: "text-amber-500",
    BLOB: "text-rose-500",
    NUMERIC: "text-cyan-500",
};

const pgColors: ColorMap = {
    INTEGER: "text-purple-500",
    BIGINT: "text-purple-400",
    SMALLINT: "text-purple-300",
    SERIAL: "text-violet-500",
    BIGSERIAL: "text-violet-400",
    FLOAT: "text-blue-500",
    DOUBLE: "text-blue-400",
    NUMERIC: "text-cyan-500",
    DECIMAL: "text-cyan-400",
    TEXT: "text-amber-500",
    VARCHAR: "text-amber-400",
    CHAR: "text-amber-300",
    BOOLEAN: "text-emerald-500",
    DATE: "text-rose-500",
    TIMESTAMP: "text-rose-400",
    JSONB: "text-teal-500",
    JSON: "text-teal-400",
    UUID: "text-pink-500",
};

const duckdbColors: ColorMap = {
    INTEGER: "text-purple-500",
    BIGINT: "text-purple-400",
    HUGEINT: "text-purple-300",
    FLOAT: "text-blue-500",
    DOUBLE: "text-blue-400",
    DECIMAL: "text-cyan-500",
    VARCHAR: "text-amber-500",
    BOOLEAN: "text-emerald-500",
    DATE: "text-rose-500",
    TIMESTAMP: "text-rose-400",
    BLOB: "text-rose-300",
    LIST: "text-teal-500",
    STRUCT: "text-teal-400",
};

const engineColorMaps: Record<EngineId, ColorMap> = {
    sqlite: sqliteColors,
    pg: pgColors,
    duckdb: duckdbColors,
};

/** Returns the Tailwind text-color class for a SQL column type in the given engine. */
export function getTypeColor(engine: EngineId, type: string): string {
    const map = engineColorMaps[engine];
    const normalized = type.toUpperCase().split("(")[0].trim();
    return map[normalized] ?? "text-zinc-400";
}

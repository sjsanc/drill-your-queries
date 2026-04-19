import type { QueryResult } from "../types/engine";

const serialize = (row: Record<string, unknown>) =>
    JSON.stringify(Object.fromEntries([...Object.entries(row)].sort()));

/** Order-insensitive equality check between two query results. */
export function compareResults(expected: QueryResult, actual: QueryResult): boolean {
    if (expected.columns.length !== actual.columns.length) return false;
    const expectedCols = [...expected.columns].sort();
    const actualCols = [...actual.columns].sort();
    if (!expectedCols.every((c, i) => c === actualCols[i])) return false;
    if (expected.rows.length !== actual.rows.length) return false;
    const expectedRows = expected.rows.map(serialize).sort();
    const actualRows = actual.rows.map(serialize).sort();
    return expectedRows.every((r, i) => r === actualRows[i]);
}

export interface DetailedComparison {
    columnMatch: Record<string, boolean>;
    rowResults: boolean[];
}

/** Per-column and per-row match booleans used to highlight differences in the output panel. */
export function detailedComparison(expected: QueryResult, actual: QueryResult): DetailedComparison {
    const expectedColSet = new Set(expected.columns);
    const columnMatch: Record<string, boolean> = {};
    for (const col of actual.columns) {
        columnMatch[col] = expectedColSet.has(col);
    }

    const expectedCounts = new Map<string, number>();
    for (const row of expected.rows) {
        const key = serialize(row);
        expectedCounts.set(key, (expectedCounts.get(key) ?? 0) + 1);
    }

    const rowResults: boolean[] = [];
    for (const row of actual.rows) {
        const key = serialize(row);
        const count = expectedCounts.get(key) ?? 0;
        if (count > 0) {
            rowResults.push(true);
            expectedCounts.set(key, count - 1);
        } else {
            rowResults.push(false);
        }
    }

    return { columnMatch, rowResults };
}

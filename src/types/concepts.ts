export type EngineTag = "generic" | "sqlite" | "pg" | "duckdb";

export const CATEGORY_ORDER = [
    "Filtering & Selection",
    "Aggregation",
    "Joins",
    "Subqueries",
    "Set Operations",
    "Expressions",
    "CTEs",
    "Window Functions",
    "SQLite",
    "PostgreSQL",
] as const;

export type ConceptCategory = (typeof CATEGORY_ORDER)[number];

export const CONCEPTS = [
    {
        id: "select-basic",
        label: "SELECT, aliases, DISTINCT",
        engine: "generic",
        category: "Filtering & Selection",
    },
    {
        id: "filter-equality",
        label: "WHERE =, <>",
        engine: "generic",
        category: "Filtering & Selection",
    },
    {
        id: "filter-comparison",
        label: "WHERE >, <, >=, <=",
        engine: "generic",
        category: "Filtering & Selection",
    },
    {
        id: "filter-logical",
        label: "AND, OR, NOT",
        engine: "generic",
        category: "Filtering & Selection",
    },
    {
        id: "filter-null",
        label: "IS NULL, IS NOT NULL",
        engine: "generic",
        category: "Filtering & Selection",
    },
    {
        id: "filter-like",
        label: "LIKE, % and _ wildcards",
        engine: "generic",
        category: "Filtering & Selection",
    },
    {
        id: "filter-in",
        label: "IN, NOT IN",
        engine: "generic",
        category: "Filtering & Selection",
    },
    {
        id: "filter-between",
        label: "BETWEEN ... AND",
        engine: "generic",
        category: "Filtering & Selection",
    },
    {
        id: "sort",
        label: "ORDER BY ASC/DESC, multi-column",
        engine: "generic",
        category: "Filtering & Selection",
    },
    {
        id: "pagination",
        label: "LIMIT, OFFSET",
        engine: "generic",
        category: "Filtering & Selection",
    },

    {
        id: "aggregate-basic",
        label: "COUNT, SUM, AVG, MIN, MAX",
        engine: "generic",
        category: "Aggregation",
    },
    {
        id: "aggregate-distinct",
        label: "COUNT(DISTINCT ...)",
        engine: "generic",
        category: "Aggregation",
    },
    {
        id: "group-by",
        label: "GROUP BY single/multi-column",
        engine: "generic",
        category: "Aggregation",
    },
    {
        id: "having",
        label: "HAVING with aggregate condition",
        engine: "generic",
        category: "Aggregation",
    },

    {
        id: "join-inner",
        label: "INNER JOIN",
        engine: "generic",
        category: "Joins",
    },
    {
        id: "join-left",
        label: "LEFT JOIN",
        engine: "generic",
        category: "Joins",
    },
    {
        id: "join-right",
        label: "RIGHT JOIN",
        engine: "generic",
        category: "Joins",
    },
    {
        id: "join-full-outer",
        label: "FULL OUTER JOIN",
        engine: "generic",
        category: "Joins",
    },
    {
        id: "join-cross",
        label: "CROSS JOIN",
        engine: "generic",
        category: "Joins",
    },
    {
        id: "join-self",
        label: "SELF JOIN",
        engine: "generic",
        category: "Joins",
    },
    {
        id: "join-multi",
        label: "3+ table joins",
        engine: "generic",
        category: "Joins",
    },

    {
        id: "subquery-scalar",
        label: "Scalar subquery in SELECT or WHERE",
        engine: "generic",
        category: "Subqueries",
    },
    {
        id: "subquery-in",
        label: "Subquery with IN / NOT IN",
        engine: "generic",
        category: "Subqueries",
    },
    {
        id: "subquery-correlated",
        label: "Correlated subquery",
        engine: "generic",
        category: "Subqueries",
    },
    {
        id: "subquery-derived",
        label: "Derived table in FROM",
        engine: "generic",
        category: "Subqueries",
    },
    {
        id: "exists",
        label: "EXISTS, NOT EXISTS",
        engine: "generic",
        category: "Subqueries",
    },

    {
        id: "union",
        label: "UNION",
        engine: "generic",
        category: "Set Operations",
    },
    {
        id: "union-all",
        label: "UNION ALL",
        engine: "generic",
        category: "Set Operations",
    },
    {
        id: "intersect",
        label: "INTERSECT",
        engine: "generic",
        category: "Set Operations",
    },
    {
        id: "except",
        label: "EXCEPT",
        engine: "generic",
        category: "Set Operations",
    },

    {
        id: "case-simple",
        label: "CASE WHEN simple equality",
        engine: "generic",
        category: "Expressions",
    },
    {
        id: "case-searched",
        label: "CASE WHEN with range/logic",
        engine: "generic",
        category: "Expressions",
    },
    {
        id: "coalesce",
        label: "COALESCE, NULLIF",
        engine: "generic",
        category: "Expressions",
    },
    {
        id: "cast",
        label: "CAST, type coercion",
        engine: "generic",
        category: "Expressions",
    },
    {
        id: "string-basic",
        label: "UPPER, LOWER, LENGTH, TRIM",
        engine: "generic",
        category: "Expressions",
    },
    {
        id: "string-concat",
        label: "|| string concatenation",
        engine: "generic",
        category: "Expressions",
    },

    {
        id: "cte-basic",
        label: "Single non-recursive WITH",
        engine: "generic",
        category: "CTEs",
    },
    {
        id: "cte-multi",
        label: "Multiple CTEs chained",
        engine: "generic",
        category: "CTEs",
    },
    {
        id: "cte-recursive",
        label: "Recursive WITH",
        engine: "generic",
        category: "CTEs",
    },

    {
        id: "window-row-number",
        label: "ROW_NUMBER() OVER",
        engine: "generic",
        category: "Window Functions",
    },
    {
        id: "window-rank",
        label: "RANK(), DENSE_RANK()",
        engine: "generic",
        category: "Window Functions",
    },
    {
        id: "window-ntile",
        label: "NTILE(n)",
        engine: "generic",
        category: "Window Functions",
    },
    {
        id: "window-lag-lead",
        label: "LAG(), LEAD()",
        engine: "generic",
        category: "Window Functions",
    },
    {
        id: "window-running-total",
        label: "SUM() OVER running frame",
        engine: "generic",
        category: "Window Functions",
    },
    {
        id: "window-partition",
        label: "PARTITION BY",
        engine: "generic",
        category: "Window Functions",
    },
    {
        id: "window-frame",
        label: "ROWS BETWEEN / RANGE BETWEEN",
        engine: "generic",
        category: "Window Functions",
    },
    {
        id: "window-first-last",
        label: "FIRST_VALUE(), LAST_VALUE()",
        engine: "generic",
        category: "Window Functions",
    },

    {
        id: "sqlite-strftime",
        label: "strftime() date formatting",
        engine: "sqlite",
        category: "SQLite",
    },
    {
        id: "sqlite-upsert",
        label: "INSERT OR REPLACE / ON CONFLICT",
        engine: "sqlite",
        category: "SQLite",
    },
    {
        id: "sqlite-json",
        label: "json_extract(), json_object()",
        engine: "sqlite",
        category: "SQLite",
    },
    {
        id: "sqlite-pragma",
        label: "PRAGMA statements",
        engine: "sqlite",
        category: "SQLite",
    },
    {
        id: "sqlite-json-col",
        label: "json_each(), querying JSON columns",
        engine: "sqlite",
        category: "SQLite",
    },

    {
        id: "pg-date",
        label: "EXTRACT(), DATE_TRUNC(), TO_CHAR()",
        engine: "pg",
        category: "PostgreSQL",
    },
    {
        id: "pg-json",
        label: "json_build_object(), json_agg(), ->> operator",
        engine: "pg",
        category: "PostgreSQL",
    },
    {
        id: "pg-jsonb",
        label: "JSONB @>, ?, jsonb_array_elements_text()",
        engine: "pg",
        category: "PostgreSQL",
    },
] as const;

export type ConceptId = (typeof CONCEPTS)[number]["id"];

export const CONCEPT_GROUPS: {
    category: ConceptCategory;
    concepts: (typeof CONCEPTS)[number][];
}[] = CATEGORY_ORDER.map((category) => ({
    category,
    concepts: CONCEPTS.filter(
        (c) => c.category === category,
    ) as (typeof CONCEPTS)[number][],
})).filter((g) => g.concepts.length > 0);

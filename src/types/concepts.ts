export type EngineTag = "generic" | "sqlite" | "pg";

export interface ConceptExample {
    sql: string;
    description: string;
}

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
        example: {
            sql: `SELECT name AS employee_name,
       department,
       DISTINCT country
FROM employees;`,
            description: "SELECT chooses columns; AS renames them with an alias; DISTINCT removes duplicate rows from the result.",
        },
    },
    {
        id: "filter-equality",
        label: "WHERE =, <>",
        engine: "generic",
        category: "Filtering & Selection",
        example: {
            sql: `SELECT * FROM orders
WHERE status = 'shipped'
  AND region <> 'Antarctica';`,
            description: "= tests exact equality; <> (or !=) tests inequality. Both work on strings, numbers, and dates.",
        },
    },
    {
        id: "filter-comparison",
        label: "WHERE >, <, >=, <=",
        engine: "generic",
        category: "Filtering & Selection",
        example: {
            sql: `SELECT * FROM products
WHERE price >= 10.00
  AND price < 50.00;`,
            description: ">, <, >=, <= compare numeric or date values. Combine them to express a range without BETWEEN.",
        },
    },
    {
        id: "filter-logical",
        label: "AND, OR, NOT",
        engine: "generic",
        category: "Filtering & Selection",
        example: {
            sql: `SELECT * FROM users
WHERE (age >= 18 AND country = 'US')
   OR (age >= 16 AND country = 'UK')
  AND NOT is_banned;`,
            description: "AND requires all conditions; OR requires any one. NOT inverts a condition. Use parentheses to control evaluation order.",
        },
    },
    {
        id: "filter-null",
        label: "IS NULL, IS NOT NULL",
        engine: "generic",
        category: "Filtering & Selection",
        example: {
            sql: `SELECT * FROM employees
WHERE manager_id IS NULL;

SELECT * FROM orders
WHERE shipped_at IS NOT NULL;`,
            description: "NULL means unknown/missing. You can't use = NULL — use IS NULL or IS NOT NULL instead.",
        },
    },
    {
        id: "filter-like",
        label: "LIKE, % and _ wildcards",
        engine: "generic",
        category: "Filtering & Selection",
        example: {
            sql: `SELECT * FROM products
WHERE name LIKE 'Laptop%'
  AND sku LIKE 'EL-___-2024';`,
            description: "LIKE matches a pattern: % matches any sequence of characters, _ matches exactly one character.",
        },
    },
    {
        id: "filter-in",
        label: "IN, NOT IN",
        engine: "generic",
        category: "Filtering & Selection",
        example: {
            sql: `SELECT * FROM orders
WHERE status IN ('pending', 'processing')
  AND region NOT IN ('blocked_zone');`,
            description: "IN tests whether a value appears in a list. NOT IN excludes those values. Both are shorthand for multiple OR/AND conditions.",
        },
    },
    {
        id: "filter-between",
        label: "BETWEEN ... AND",
        engine: "generic",
        category: "Filtering & Selection",
        example: {
            sql: `SELECT * FROM sales
WHERE sale_date BETWEEN '2024-01-01' AND '2024-12-31'
  AND amount BETWEEN 100 AND 1000;`,
            description: "BETWEEN x AND y is inclusive — it matches x, y, and everything in between. Works on numbers, dates, and strings.",
        },
    },
    {
        id: "sort",
        label: "ORDER BY ASC/DESC, multi-column",
        engine: "generic",
        category: "Filtering & Selection",
        example: {
            sql: `SELECT name, salary, department
FROM employees
ORDER BY department ASC, salary DESC;`,
            description: "ORDER BY sorts results. ASC (default) sorts low-to-high; DESC sorts high-to-low. Multiple columns are applied left to right.",
        },
    },
    {
        id: "pagination",
        label: "LIMIT, OFFSET",
        engine: "generic",
        category: "Filtering & Selection",
        example: {
            sql: `SELECT * FROM products
ORDER BY created_at DESC
LIMIT 10 OFFSET 20;`,
            description: "LIMIT caps the number of rows returned. OFFSET skips that many rows first — useful for fetching page N of results.",
        },
    },

    {
        id: "aggregate-basic",
        label: "COUNT, SUM, AVG, MIN, MAX",
        engine: "generic",
        category: "Aggregation",
        example: {
            sql: `SELECT
  COUNT(*)          AS total_rows,
  SUM(amount)       AS revenue,
  AVG(amount)       AS avg_order,
  MIN(amount)       AS smallest,
  MAX(amount)       AS largest
FROM orders;`,
            description: "Aggregate functions collapse many rows into one value. COUNT(*) counts all rows; the others operate on a numeric column.",
        },
    },
    {
        id: "aggregate-distinct",
        label: "COUNT(DISTINCT ...)",
        engine: "generic",
        category: "Aggregation",
        example: {
            sql: `SELECT COUNT(DISTINCT customer_id) AS unique_customers
FROM orders;`,
            description: "COUNT(DISTINCT col) counts how many unique values exist in a column, ignoring duplicates.",
        },
    },
    {
        id: "group-by",
        label: "GROUP BY single/multi-column",
        engine: "generic",
        category: "Aggregation",
        example: {
            sql: `SELECT department,
       COUNT(*)      AS headcount,
       AVG(salary)   AS avg_salary
FROM employees
GROUP BY department;`,
            description: "GROUP BY splits rows into groups by one or more columns. Aggregate functions then summarise each group independently.",
        },
    },
    {
        id: "having",
        label: "HAVING with aggregate condition",
        engine: "generic",
        category: "Aggregation",
        example: {
            sql: `SELECT department, COUNT(*) AS headcount
FROM employees
GROUP BY department
HAVING COUNT(*) > 5;`,
            description: "HAVING filters groups after aggregation — like WHERE, but for GROUP BY results. You can reference aggregate expressions in it.",
        },
    },

    {
        id: "join-inner",
        label: "INNER JOIN",
        engine: "generic",
        category: "Joins",
        example: {
            sql: `SELECT o.id, c.name, o.total
FROM orders o
INNER JOIN customers c ON c.id = o.customer_id;`,
            description: "INNER JOIN returns only rows where the ON condition matches in both tables. Rows without a match are excluded.",
        },
    },
    {
        id: "join-left",
        label: "LEFT JOIN",
        engine: "generic",
        category: "Joins",
        example: {
            sql: `SELECT c.name, COUNT(o.id) AS order_count
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
GROUP BY c.name;`,
            description: "LEFT JOIN keeps all rows from the left table. If no matching row exists in the right table, its columns are filled with NULL.",
        },
    },
    {
        id: "join-right",
        label: "RIGHT JOIN",
        engine: "generic",
        category: "Joins",
        example: {
            sql: `SELECT d.name AS department, e.name AS employee
FROM employees e
RIGHT JOIN departments d ON d.id = e.department_id;`,
            description: "RIGHT JOIN keeps all rows from the right table. Unmatched rows from the left table become NULL. Less common than LEFT JOIN.",
        },
    },
    {
        id: "join-full-outer",
        label: "FULL OUTER JOIN",
        engine: "generic",
        category: "Joins",
        example: {
            sql: `SELECT c.name AS customer, s.name AS supplier
FROM customers c
FULL OUTER JOIN suppliers s ON s.country = c.country;`,
            description: "FULL OUTER JOIN returns all rows from both tables. Where no match exists, the other table's columns are NULL.",
        },
    },
    {
        id: "join-cross",
        label: "CROSS JOIN",
        engine: "generic",
        category: "Joins",
        example: {
            sql: `SELECT s.size, c.color
FROM sizes s
CROSS JOIN colors c;`,
            description: "CROSS JOIN produces every combination of rows from both tables (the Cartesian product). No ON condition is needed.",
        },
    },
    {
        id: "join-self",
        label: "SELF JOIN",
        engine: "generic",
        category: "Joins",
        example: {
            sql: `SELECT e.name AS employee,
       m.name AS manager
FROM employees e
LEFT JOIN employees m ON m.id = e.manager_id;`,
            description: "A self join joins a table to itself using an alias. Useful for hierarchies — here each employee row is matched to its manager row.",
        },
    },
    {
        id: "join-multi",
        label: "3+ table joins",
        engine: "generic",
        category: "Joins",
        example: {
            sql: `SELECT o.id, c.name, p.name AS product, oi.quantity
FROM orders o
JOIN customers c  ON c.id  = o.customer_id
JOIN order_items oi ON oi.order_id = o.id
JOIN products p   ON p.id  = oi.product_id;`,
            description: "Chain multiple JOINs to pull data from three or more tables. Each JOIN adds another table to the result.",
        },
    },

    {
        id: "subquery-scalar",
        label: "Scalar subquery in SELECT or WHERE",
        engine: "generic",
        category: "Subqueries",
        example: {
            sql: `SELECT name,
       salary,
       (SELECT AVG(salary) FROM employees) AS company_avg
FROM employees;`,
            description: "A scalar subquery returns exactly one row and one column. It can appear anywhere an expression is valid — SELECT, WHERE, ORDER BY.",
        },
    },
    {
        id: "subquery-in",
        label: "Subquery with IN / NOT IN",
        engine: "generic",
        category: "Subqueries",
        example: {
            sql: `SELECT name FROM customers
WHERE id IN (
  SELECT customer_id
  FROM orders
  WHERE total > 1000
);`,
            description: "A subquery inside IN returns a list of values. The outer query matches rows whose column value appears in that list.",
        },
    },
    {
        id: "subquery-correlated",
        label: "Correlated subquery",
        engine: "generic",
        category: "Subqueries",
        example: {
            sql: `SELECT name, salary
FROM employees e
WHERE salary > (
  SELECT AVG(salary)
  FROM employees
  WHERE department = e.department
);`,
            description: "A correlated subquery references columns from the outer query (e.department here). It re-executes for each outer row.",
        },
    },
    {
        id: "subquery-derived",
        label: "Derived table in FROM",
        engine: "generic",
        category: "Subqueries",
        example: {
            sql: `SELECT dept, avg_salary
FROM (
  SELECT department AS dept,
         AVG(salary) AS avg_salary
  FROM employees
  GROUP BY department
) AS dept_stats
WHERE avg_salary > 60000;`,
            description: "A derived table (subquery in FROM) produces an inline result set. Give it an alias to reference it in the outer query.",
        },
    },
    {
        id: "exists",
        label: "EXISTS, NOT EXISTS",
        engine: "generic",
        category: "Subqueries",
        example: {
            sql: `SELECT name FROM customers c
WHERE EXISTS (
  SELECT 1 FROM orders o
  WHERE o.customer_id = c.id
    AND o.total > 500
);`,
            description: "EXISTS returns true if the subquery produces any rows. It stops as soon as one match is found, making it efficient for membership tests.",
        },
    },

    {
        id: "union",
        label: "UNION",
        engine: "generic",
        category: "Set Operations",
        example: {
            sql: `SELECT name, 'customer' AS type FROM customers
UNION
SELECT name, 'supplier' AS type FROM suppliers;`,
            description: "UNION combines results from two queries and removes duplicate rows. Both queries must return the same number of columns with compatible types.",
        },
    },
    {
        id: "union-all",
        label: "UNION ALL",
        engine: "generic",
        category: "Set Operations",
        example: {
            sql: `SELECT 'income'  AS type, amount FROM revenues
UNION ALL
SELECT 'expense' AS type, amount FROM expenses;`,
            description: "UNION ALL combines results like UNION but keeps all rows, including duplicates. It is faster than UNION because no deduplication is done.",
        },
    },
    {
        id: "intersect",
        label: "INTERSECT",
        engine: "generic",
        category: "Set Operations",
        example: {
            sql: `SELECT customer_id FROM orders_2023
INTERSECT
SELECT customer_id FROM orders_2024;`,
            description: "INTERSECT returns only rows that appear in both result sets — the overlap between two queries.",
        },
    },
    {
        id: "except",
        label: "EXCEPT",
        engine: "generic",
        category: "Set Operations",
        example: {
            sql: `SELECT id FROM all_users
EXCEPT
SELECT user_id FROM active_sessions;`,
            description: "EXCEPT returns rows from the first query that do not appear in the second — the set difference.",
        },
    },

    {
        id: "case-simple",
        label: "CASE WHEN simple equality",
        engine: "generic",
        category: "Expressions",
        example: {
            sql: `SELECT name,
  CASE status
    WHEN 'A' THEN 'Active'
    WHEN 'I' THEN 'Inactive'
    ELSE 'Unknown'
  END AS status_label
FROM employees;`,
            description: "Simple CASE compares a single expression against fixed values. The first matching WHEN branch wins; ELSE is the fallback.",
        },
    },
    {
        id: "case-searched",
        label: "CASE WHEN with range/logic",
        engine: "generic",
        category: "Expressions",
        example: {
            sql: `SELECT name, salary,
  CASE
    WHEN salary < 40000 THEN 'Junior'
    WHEN salary < 80000 THEN 'Mid'
    ELSE 'Senior'
  END AS band
FROM employees;`,
            description: "Searched CASE evaluates independent boolean conditions in order. Use it when each branch needs a different expression or range check.",
        },
    },
    {
        id: "coalesce",
        label: "COALESCE, NULLIF",
        engine: "generic",
        category: "Expressions",
        example: {
            sql: `SELECT name,
  COALESCE(phone, email, 'no contact') AS contact,
  NULLIF(discount, 0)                  AS real_discount
FROM customers;`,
            description: "COALESCE returns the first non-NULL argument — handy for fallback chains. NULLIF(a, b) returns NULL when a equals b, otherwise returns a.",
        },
    },
    {
        id: "cast",
        label: "CAST, type coercion",
        engine: "generic",
        category: "Expressions",
        example: {
            sql: `SELECT CAST(price AS INTEGER)   AS price_int,
       CAST(created_at AS TEXT) AS created_str
FROM products;`,
            description: "CAST converts a value to a different data type. Use it when you need to control comparisons, arithmetic, or string formatting.",
        },
    },
    {
        id: "string-basic",
        label: "UPPER, LOWER, LENGTH, TRIM",
        engine: "generic",
        category: "Expressions",
        example: {
            sql: `SELECT
  UPPER(first_name)  AS fname,
  LOWER(last_name)   AS lname,
  LENGTH(email)      AS email_len,
  TRIM(notes)        AS clean_notes
FROM employees;`,
            description: "UPPER/LOWER change case; LENGTH returns character count; TRIM strips leading and trailing whitespace.",
        },
    },
    {
        id: "string-concat",
        label: "|| string concatenation",
        engine: "generic",
        category: "Expressions",
        example: {
            sql: `SELECT first_name || ' ' || last_name     AS full_name,
       'EMP-' || CAST(id AS TEXT) AS label
FROM employees;`,
            description: "The || operator concatenates strings. Cast non-string values with CAST first, or you may get a type error.",
        },
    },

    {
        id: "cte-basic",
        label: "Single non-recursive WITH",
        engine: "generic",
        category: "CTEs",
        example: {
            sql: `WITH senior_staff AS (
  SELECT * FROM employees
  WHERE salary > 80000
)
SELECT department, COUNT(*) AS seniors
FROM senior_staff
GROUP BY department;`,
            description: "A CTE (Common Table Expression) names a subquery with WITH so you can reference it by name below. It improves readability over nested subqueries.",
        },
    },
    {
        id: "cte-multi",
        label: "Multiple CTEs chained",
        engine: "generic",
        category: "CTEs",
        example: {
            sql: `WITH
  revenue AS (
    SELECT region, SUM(amount) AS total
    FROM sales GROUP BY region
  ),
  costs AS (
    SELECT region, SUM(amount) AS total
    FROM expenses GROUP BY region
  )
SELECT r.region,
       r.total - c.total AS profit
FROM revenue r
JOIN costs c ON c.region = r.region;`,
            description: "Separate WITH clauses with a comma. Later CTEs can reference earlier ones. This lets you build up a complex query step by step.",
        },
    },
    {
        id: "cte-recursive",
        label: "Recursive WITH",
        engine: "generic",
        category: "CTEs",
        example: {
            sql: `WITH RECURSIVE org AS (
  -- anchor: start from the roots
  SELECT id, name, manager_id, 1 AS depth
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  -- recursive step: walk one level deeper
  SELECT e.id, e.name, e.manager_id, o.depth + 1
  FROM employees e
  JOIN org o ON o.id = e.manager_id
)
SELECT * FROM org ORDER BY depth;`,
            description: "A recursive CTE has an anchor member (the base case) and a recursive member joined with UNION ALL. It repeats until no new rows are produced.",
        },
    },

    {
        id: "window-row-number",
        label: "ROW_NUMBER() OVER",
        engine: "generic",
        category: "Window Functions",
        example: {
            sql: `SELECT name, department, salary,
  ROW_NUMBER() OVER (ORDER BY salary DESC) AS overall_rank
FROM employees;`,
            description: "ROW_NUMBER() assigns a unique sequential integer to each row within the window, with no ties. The ORDER BY inside OVER determines the numbering.",
        },
    },
    {
        id: "window-rank",
        label: "RANK(), DENSE_RANK()",
        engine: "generic",
        category: "Window Functions",
        example: {
            sql: `SELECT name, salary,
  RANK()       OVER (ORDER BY salary DESC) AS rnk,
  DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rnk
FROM employees;`,
            description: "RANK() skips numbers after ties (1,1,3); DENSE_RANK() does not (1,1,2). Both assign the same rank to equal values.",
        },
    },
    {
        id: "window-ntile",
        label: "NTILE(n)",
        engine: "generic",
        category: "Window Functions",
        example: {
            sql: `SELECT name, salary,
  NTILE(4) OVER (ORDER BY salary) AS quartile
FROM employees;`,
            description: "NTILE(n) divides rows into n roughly equal buckets and assigns each row a bucket number. Useful for percentile-style analysis.",
        },
    },
    {
        id: "window-lag-lead",
        label: "LAG(), LEAD()",
        engine: "generic",
        category: "Window Functions",
        example: {
            sql: `SELECT name, salary, hire_date,
  LAG(salary)  OVER (ORDER BY hire_date) AS prev_hire_salary,
  LEAD(salary) OVER (ORDER BY hire_date) AS next_hire_salary
FROM employees;`,
            description: "LAG accesses the previous row's value; LEAD accesses the next row's value. Both accept an optional offset and default value.",
        },
    },
    {
        id: "window-running-total",
        label: "SUM() OVER running frame",
        engine: "generic",
        category: "Window Functions",
        example: {
            sql: `SELECT order_date, amount,
  SUM(amount) OVER (
    ORDER BY order_date
  ) AS running_total
FROM orders;`,
            description: "Omitting ROWS/RANGE makes SUM() OVER accumulate from the first row to the current row — a running total.",
        },
    },
    {
        id: "window-partition",
        label: "PARTITION BY",
        engine: "generic",
        category: "Window Functions",
        example: {
            sql: `SELECT name, department, salary,
  AVG(salary) OVER (PARTITION BY department) AS dept_avg,
  salary - AVG(salary) OVER (PARTITION BY department) AS diff
FROM employees;`,
            description: "PARTITION BY splits the window into independent groups. Each row sees an aggregate calculated only within its own partition.",
        },
    },
    {
        id: "window-frame",
        label: "ROWS BETWEEN / RANGE BETWEEN",
        engine: "generic",
        category: "Window Functions",
        example: {
            sql: `SELECT order_date, amount,
  SUM(amount) OVER (
    ORDER BY order_date
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
  ) AS rolling_3day_sum
FROM daily_sales;`,
            description: "ROWS BETWEEN defines which rows around the current row form the frame. ROWS counts physical rows; RANGE uses value-based boundaries.",
        },
    },
    {
        id: "window-first-last",
        label: "FIRST_VALUE(), LAST_VALUE()",
        engine: "generic",
        category: "Window Functions",
        example: {
            sql: `SELECT name, department, salary,
  FIRST_VALUE(name) OVER (
    PARTITION BY department ORDER BY salary DESC
  ) AS top_earner,
  LAST_VALUE(name) OVER (
    PARTITION BY department ORDER BY salary DESC
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
  ) AS lowest_earner
FROM employees;`,
            description: "FIRST_VALUE/LAST_VALUE return the value from the first/last row of the window frame. LAST_VALUE requires an explicit unbounded frame to work correctly.",
        },
    },

    {
        id: "sqlite-strftime",
        label: "strftime() date formatting",
        engine: "sqlite",
        category: "SQLite",
        example: {
            sql: `SELECT name,
  strftime('%Y',    hire_date)  AS hire_year,
  strftime('%m-%d', birth_date) AS birthday,
  strftime('%s',    'now')      AS unix_now
FROM employees;`,
            description: "SQLite's strftime() formats date strings using printf-style codes: %Y=year, %m=month, %d=day, %s=unix timestamp.",
        },
    },
    {
        id: "sqlite-upsert",
        label: "INSERT OR REPLACE / ON CONFLICT",
        engine: "sqlite",
        category: "SQLite",
        example: {
            sql: `INSERT INTO settings (key, value)
VALUES ('theme', 'dark')
ON CONFLICT (key)
DO UPDATE SET value = excluded.value;`,
            description: "ON CONFLICT handles a uniqueness violation: DO NOTHING ignores it; DO UPDATE patches the existing row. excluded refers to the rejected row's values.",
        },
    },
    {
        id: "sqlite-json",
        label: "json_extract(), json_object()",
        engine: "sqlite",
        category: "SQLite",
        example: {
            sql: `SELECT
  json_extract(metadata, '$.color')   AS color,
  json_extract(metadata, '$.sizes[0]') AS first_size,
  json_object('id', id, 'name', name)  AS row_as_json
FROM products;`,
            description: "json_extract() pulls a value out of a JSON string using a path expression. json_object() builds a JSON object from key-value pairs.",
        },
    },
    {
        id: "sqlite-pragma",
        label: "PRAGMA statements",
        engine: "sqlite",
        category: "SQLite",
        example: {
            sql: `-- List columns in a table
PRAGMA table_info(employees);

-- Enable foreign key enforcement
PRAGMA foreign_keys = ON;

-- Show all tables
PRAGMA table_list;`,
            description: "PRAGMA statements query or configure SQLite engine settings. They are SQLite-specific and have no standard SQL equivalent.",
        },
    },
    {
        id: "sqlite-json-col",
        label: "json_each(), querying JSON columns",
        engine: "sqlite",
        category: "SQLite",
        example: {
            sql: `SELECT p.name, j.value AS tag
FROM products p,
     json_each(p.tags) AS j;`,
            description: "json_each() expands a JSON array stored in a column into one row per element. Cross-joining it with the parent table correlates each element back to its row.",
        },
    },

    {
        id: "pg-date",
        label: "EXTRACT(), DATE_TRUNC(), TO_CHAR()",
        engine: "pg",
        category: "PostgreSQL",
        example: {
            sql: `SELECT
  EXTRACT(year  FROM created_at)        AS yr,
  DATE_TRUNC('month', created_at)       AS month_start,
  TO_CHAR(created_at, 'YYYY-MM-DD')     AS formatted
FROM orders;`,
            description: "EXTRACT pulls a single date part (year, month, day…); DATE_TRUNC rounds a timestamp down to a boundary; TO_CHAR formats it as a string.",
        },
    },
    {
        id: "pg-json",
        label: "json_build_object(), json_agg(), ->> operator",
        engine: "pg",
        category: "PostgreSQL",
        example: {
            sql: `SELECT
  json_build_object('id', id, 'name', name) AS obj,
  json_agg(item_name ORDER BY item_name)    AS items,
  metadata->>'color'                         AS color
FROM products
GROUP BY id, name, metadata;`,
            description: "json_build_object() constructs a JSON object; json_agg() aggregates values into a JSON array; ->> extracts a field as text.",
        },
    },
    {
        id: "pg-jsonb",
        label: "JSONB @>, ?, jsonb_array_elements_text()",
        engine: "pg",
        category: "PostgreSQL",
        example: {
            sql: `-- Does the JSONB contain this sub-document?
SELECT * FROM products
WHERE metadata @> '{"in_stock": true}';

-- Does the key exist?
SELECT * FROM products
WHERE metadata ? 'color';

-- Expand a JSONB array to rows
SELECT jsonb_array_elements_text(tags) AS tag
FROM products;`,
            description: "@> tests if the left JSONB contains the right; ? tests key existence. jsonb_array_elements_text() unnests a JSONB array into rows.",
        },
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

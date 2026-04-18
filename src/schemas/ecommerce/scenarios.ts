import type { Scenario } from "../../types/scenario";

export const ecommerceScenarios: Scenario[] = [
    // ── select-basic ────────────────────────────────────────────────────────────
    {
        id: "ecom-select-basic-1",
        prompt: "List the name and price of every product",
        concepts: ["select-basic"],
        difficulty: 1,
        expectedSql: "SELECT name, price FROM products",
    },
    {
        id: "ecom-select-basic-2",
        prompt: "List all distinct countries that customers are from",
        concepts: ["select-basic"],
        difficulty: 1,
        expectedSql: "SELECT DISTINCT country FROM customers",
    },
    {
        id: "ecom-select-basic-3",
        prompt: "Show each customer's name and email, aliased as 'customer' and 'contact'",
        concepts: ["select-basic"],
        difficulty: 1,
        expectedSql: "SELECT name AS customer, email AS contact FROM customers",
    },
    {
        id: "ecom-select-basic-4",
        prompt: "List all distinct countries that suppliers are based in",
        concepts: ["select-basic"],
        difficulty: 1,
        expectedSql: "SELECT DISTINCT country FROM suppliers",
    },
    {
        id: "ecom-select-basic-5",
        prompt: "Show each order's id and status, aliased as 'order_id' and 'order_status'",
        concepts: ["select-basic"],
        difficulty: 1,
        expectedSql:
            "SELECT id AS order_id, status AS order_status FROM orders",
    },

    // ── filter-equality ─────────────────────────────────────────────────────────
    {
        id: "ecom-filter-equality-1",
        prompt: "Show all products in the Phones category (category_id = 2)",
        concepts: ["filter-equality"],
        difficulty: 1,
        expectedSql: "SELECT name, price FROM products WHERE category_id = 2",
    },
    {
        id: "ecom-filter-equality-2",
        prompt: "Show the name and email of every gold-tier customer",
        concepts: ["filter-equality"],
        difficulty: 1,
        expectedSql: "SELECT name, email FROM customers WHERE tier = 'gold'",
    },
    {
        id: "ecom-filter-equality-3",
        prompt: "Show all delivered orders (id, customer_id, created_at)",
        concepts: ["filter-equality"],
        difficulty: 1,
        expectedSql:
            "SELECT id, customer_id, created_at FROM orders WHERE status = 'delivered'",
    },
    {
        id: "ecom-filter-equality-4",
        prompt: "Show the name and contact email of every supplier based in Germany (country = 'DE')",
        concepts: ["filter-equality"],
        difficulty: 1,
        expectedSql:
            "SELECT name, contact_email FROM suppliers WHERE country = 'DE'",
    },
    {
        id: "ecom-filter-equality-5",
        prompt: "Show the name and price of every inactive product (is_active = 0)",
        concepts: ["filter-equality"],
        difficulty: 1,
        expectedSql: "SELECT name, price FROM products WHERE is_active = 0",
    },

    // ── filter-comparison ───────────────────────────────────────────────────────
    {
        id: "ecom-filter-comparison-1",
        prompt: "Show all products priced above $500",
        concepts: ["filter-comparison"],
        difficulty: 1,
        expectedSql: "SELECT name, price FROM products WHERE price > 500",
    },
    {
        id: "ecom-filter-comparison-2",
        prompt: "Show the name and stock of every product with 30 or fewer units in stock",
        concepts: ["filter-comparison"],
        difficulty: 1,
        expectedSql: "SELECT name, stock FROM products WHERE stock <= 30",
    },
    {
        id: "ecom-filter-comparison-3",
        prompt: "Show customers with more than 1000 loyalty points",
        concepts: ["filter-comparison"],
        difficulty: 1,
        expectedSql:
            "SELECT name, loyalty_points FROM customers WHERE loyalty_points > 1000",
    },
    {
        id: "ecom-filter-comparison-4",
        prompt: "Show all reviews with a rating below 3 (id, product_id, rating)",
        concepts: ["filter-comparison"],
        difficulty: 1,
        expectedSql:
            "SELECT id, product_id, rating FROM reviews WHERE rating < 3",
    },
    {
        id: "ecom-filter-comparison-5",
        prompt: "Show order items where more than 1 unit was ordered (order_id, product_id, quantity)",
        concepts: ["filter-comparison"],
        difficulty: 1,
        expectedSql:
            "SELECT order_id, product_id, quantity FROM order_items WHERE quantity > 1",
    },

    // ── filter-logical ──────────────────────────────────────────────────────────
    {
        id: "ecom-filter-logical-1",
        prompt: "Show active products priced under $100",
        concepts: ["filter-logical"],
        difficulty: 1,
        expectedSql:
            "SELECT name, price FROM products WHERE is_active = 1 AND price < 100",
    },
    {
        id: "ecom-filter-logical-2",
        prompt: "Show customers from the US or UK",
        concepts: ["filter-logical"],
        difficulty: 1,
        expectedSql:
            "SELECT name, country FROM customers WHERE country = 'US' OR country = 'UK'",
    },
    {
        id: "ecom-filter-logical-3",
        prompt: "Show all orders that are not cancelled",
        concepts: ["filter-logical"],
        difficulty: 1,
        expectedSql:
            "SELECT id, status, created_at FROM orders WHERE NOT status = 'cancelled'",
    },
    {
        id: "ecom-filter-logical-4",
        prompt: "Show products that are either in the Audio category (category_id = 4) or cost more than $1000",
        concepts: ["filter-logical"],
        difficulty: 1,
        expectedSql:
            "SELECT name, category_id, price FROM products WHERE category_id = 4 OR price > 1000",
    },
    {
        id: "ecom-filter-logical-5",
        prompt: "Show silver-tier customers with fewer than 700 loyalty points",
        concepts: ["filter-logical"],
        difficulty: 1,
        expectedSql:
            "SELECT name, tier, loyalty_points FROM customers WHERE tier = 'silver' AND loyalty_points < 700",
    },

    // ── filter-null ─────────────────────────────────────────────────────────────
    {
        id: "ecom-filter-null-1",
        prompt: "Show all top-level categories — those that have no parent (id, name)",
        concepts: ["filter-null"],
        difficulty: 1,
        expectedSql: "SELECT id, name FROM categories WHERE parent_id IS NULL",
    },
    {
        id: "ecom-filter-null-2",
        prompt: "Show all subcategories — those that belong to a parent category (id, name, parent_id)",
        concepts: ["filter-null"],
        difficulty: 1,
        expectedSql:
            "SELECT id, name, parent_id FROM categories WHERE parent_id IS NOT NULL",
    },
    {
        id: "ecom-filter-null-3",
        prompt: "Show all products that have a weight recorded (name, weight)",
        concepts: ["filter-null"],
        difficulty: 1,
        expectedSql:
            "SELECT name, weight FROM products WHERE weight IS NOT NULL",
    },

    // ── filter-like ─────────────────────────────────────────────────────────────
    {
        id: "ecom-filter-like-1",
        prompt: "Show all products whose name contains 'Pro'",
        concepts: ["filter-like"],
        difficulty: 1,
        expectedSql: "SELECT name, price FROM products WHERE name LIKE '%Pro%'",
    },
    {
        id: "ecom-filter-like-2",
        prompt: "Show all customers whose last name ends with 'son' (e.g. Johnson, Wilson)",
        concepts: ["filter-like"],
        difficulty: 1,
        expectedSql: "SELECT name, email FROM customers WHERE name LIKE '%son'",
    },
    {
        id: "ecom-filter-like-3",
        prompt: "Show all suppliers whose name ends with 'Ltd'",
        concepts: ["filter-like"],
        difficulty: 1,
        expectedSql:
            "SELECT name, country FROM suppliers WHERE name LIKE '% Ltd'",
    },
    {
        id: "ecom-filter-like-4",
        prompt: "Show all products whose name starts with any single character followed by 'SB' (hint: use _ wildcard)",
        concepts: ["filter-like"],
        difficulty: 1,
        expectedSql: "SELECT name FROM products WHERE name LIKE '_SB%'",
    },

    // ── filter-in ───────────────────────────────────────────────────────────────
    {
        id: "ecom-filter-in-1",
        prompt: "Show orders with status 'shipped' or 'pending' (id, customer_id, status)",
        concepts: ["filter-in"],
        difficulty: 1,
        expectedSql:
            "SELECT id, customer_id, status FROM orders WHERE status IN ('shipped', 'pending')",
    },
    {
        id: "ecom-filter-in-2",
        prompt: "Show products in the Phones (2) or Laptops (3) category (name, category_id, price)",
        concepts: ["filter-in"],
        difficulty: 1,
        expectedSql:
            "SELECT name, category_id, price FROM products WHERE category_id IN (2, 3)",
    },
    {
        id: "ecom-filter-in-3",
        prompt: "Show customers NOT from English-speaking countries (not US, UK, CA, or AU)",
        concepts: ["filter-in"],
        difficulty: 1,
        expectedSql:
            "SELECT name, country FROM customers WHERE country NOT IN ('US', 'UK', 'CA', 'AU')",
    },
    {
        id: "ecom-filter-in-4",
        prompt: "Show reviews for products 1, 4, or 7 (customer_id, product_id, rating)",
        concepts: ["filter-in"],
        difficulty: 1,
        expectedSql:
            "SELECT customer_id, product_id, rating FROM reviews WHERE product_id IN (1, 4, 7)",
    },

    // ── filter-between ──────────────────────────────────────────────────────────
    {
        id: "ecom-filter-between-1",
        prompt: "Show products priced between $100 and $1000 inclusive (name, price)",
        concepts: ["filter-between"],
        difficulty: 1,
        expectedSql:
            "SELECT name, price FROM products WHERE price BETWEEN 100 AND 1000",
    },
    {
        id: "ecom-filter-between-2",
        prompt: "Show orders placed in February 2024 (id, customer_id, status, created_at)",
        concepts: ["filter-between"],
        difficulty: 1,
        expectedSql:
            "SELECT id, customer_id, status, created_at FROM orders WHERE created_at BETWEEN '2024-02-01' AND '2024-02-28'",
    },
    {
        id: "ecom-filter-between-3",
        prompt: "Show customers with loyalty points between 500 and 1500 inclusive (name, loyalty_points)",
        concepts: ["filter-between"],
        difficulty: 1,
        expectedSql:
            "SELECT name, loyalty_points FROM customers WHERE loyalty_points BETWEEN 500 AND 1500",
    },
    {
        id: "ecom-filter-between-4",
        prompt: "Show reviews with a rating between 3 and 4 inclusive (customer_id, product_id, rating)",
        concepts: ["filter-between"],
        difficulty: 1,
        expectedSql:
            "SELECT customer_id, product_id, rating FROM reviews WHERE rating BETWEEN 3 AND 4",
    },

    // ── sort ────────────────────────────────────────────────────────────────────
    {
        id: "ecom-sort-1",
        prompt: "List all products ordered by price descending (name, price)",
        concepts: ["sort"],
        difficulty: 1,
        expectedSql: "SELECT name, price FROM products ORDER BY price DESC",
    },
    {
        id: "ecom-sort-2",
        prompt: "List customers ordered by loyalty points descending, then name alphabetically (name, loyalty_points)",
        concepts: ["sort"],
        difficulty: 1,
        expectedSql:
            "SELECT name, loyalty_points FROM customers ORDER BY loyalty_points DESC, name ASC",
    },
    {
        id: "ecom-sort-3",
        prompt: "List reviews ordered by rating ascending, then created_at descending (product_id, rating, created_at)",
        concepts: ["sort"],
        difficulty: 1,
        expectedSql:
            "SELECT product_id, rating, created_at FROM reviews ORDER BY rating ASC, created_at DESC",
    },
    {
        id: "ecom-sort-4",
        prompt: "List order items ordered by quantity descending, then unit_price descending (order_id, product_id, quantity, unit_price)",
        concepts: ["sort"],
        difficulty: 1,
        expectedSql:
            "SELECT order_id, product_id, quantity, unit_price FROM order_items ORDER BY quantity DESC, unit_price DESC",
    },
    {
        id: "ecom-sort-5",
        prompt: "List suppliers ordered by country ascending, then name ascending (name, country)",
        concepts: ["sort"],
        difficulty: 1,
        expectedSql:
            "SELECT name, country FROM suppliers ORDER BY country ASC, name ASC",
    },

    // ── pagination ──────────────────────────────────────────────────────────────
    {
        id: "ecom-pagination-1",
        prompt: "Show the 5 most expensive products (name, price)",
        concepts: ["pagination"],
        difficulty: 1,
        expectedSql:
            "SELECT name, price FROM products ORDER BY price DESC LIMIT 5",
    },
    {
        id: "ecom-pagination-2",
        prompt: "Show the 3rd through 5th oldest customers by join date (name, joined_at) — use LIMIT and OFFSET",
        concepts: ["pagination"],
        difficulty: 1,
        expectedSql:
            "SELECT name, joined_at FROM customers ORDER BY joined_at ASC LIMIT 3 OFFSET 2",
    },
    {
        id: "ecom-pagination-3",
        prompt: "Show the 10 most recent orders (id, customer_id, status, created_at)",
        concepts: ["pagination"],
        difficulty: 1,
        expectedSql:
            "SELECT id, customer_id, status, created_at FROM orders ORDER BY created_at DESC LIMIT 10",
    },
    {
        id: "ecom-pagination-4",
        prompt: "Show products 6 through 10 when sorted alphabetically by name — use LIMIT and OFFSET (name)",
        concepts: ["pagination"],
        difficulty: 1,
        expectedSql:
            "SELECT name FROM products ORDER BY name ASC LIMIT 5 OFFSET 5",
    },

    // ── aggregate-basic ─────────────────────────────────────────────────────────
    {
        id: "ecom-aggregate-basic-1",
        prompt: "Count the total number of customers",
        concepts: ["aggregate-basic"],
        difficulty: 1,
        expectedSql: "SELECT COUNT(*) AS total_customers FROM customers",
    },
    {
        id: "ecom-aggregate-basic-2",
        prompt: "Count the number of delivered orders",
        concepts: ["aggregate-basic"],
        difficulty: 1,
        expectedSql:
            "SELECT COUNT(*) AS delivered_orders FROM orders WHERE status = 'delivered'",
    },
    {
        id: "ecom-aggregate-basic-3",
        prompt: "Find the total revenue across all order items (quantity × unit_price), aliased as total_revenue",
        concepts: ["aggregate-basic"],
        difficulty: 1,
        expectedSql:
            "SELECT SUM(quantity * unit_price) AS total_revenue FROM order_items",
    },
    {
        id: "ecom-aggregate-basic-4",
        prompt: "Find the average product price, aliased as avg_price",
        concepts: ["aggregate-basic"],
        difficulty: 1,
        expectedSql: "SELECT AVG(price) AS avg_price FROM products",
    },
    {
        id: "ecom-aggregate-basic-5",
        prompt: "Find the most expensive and cheapest product prices, aliased as max_price and min_price",
        concepts: ["aggregate-basic"],
        difficulty: 1,
        expectedSql:
            "SELECT MAX(price) AS max_price, MIN(price) AS min_price FROM products",
    },
    {
        id: "ecom-aggregate-basic-6",
        prompt: "Find the total stock across all active products, aliased as total_stock",
        concepts: ["aggregate-basic"],
        difficulty: 1,
        expectedSql:
            "SELECT SUM(stock) AS total_stock FROM products WHERE is_active = 1",
    },

    // ── aggregate-distinct ──────────────────────────────────────────────────────
    {
        id: "ecom-aggregate-distinct-1",
        prompt: "Count how many distinct countries customers come from, aliased as country_count",
        concepts: ["aggregate-distinct"],
        difficulty: 1,
        expectedSql:
            "SELECT COUNT(DISTINCT country) AS country_count FROM customers",
    },
    {
        id: "ecom-aggregate-distinct-2",
        prompt: "Count how many distinct products have been reviewed, aliased as reviewed_products",
        concepts: ["aggregate-distinct"],
        difficulty: 1,
        expectedSql:
            "SELECT COUNT(DISTINCT product_id) AS reviewed_products FROM reviews",
    },
    {
        id: "ecom-aggregate-distinct-3",
        prompt: "Count how many distinct customers have placed at least one order, aliased as active_customers",
        concepts: ["aggregate-distinct"],
        difficulty: 1,
        expectedSql:
            "SELECT COUNT(DISTINCT customer_id) AS active_customers FROM orders",
    },

    // ── group-by ────────────────────────────────────────────────────────────────
    {
        id: "ecom-group-by-1",
        prompt: "Count the number of products in each category (category_id, product_count)",
        concepts: ["group-by"],
        difficulty: 1,
        expectedSql:
            "SELECT category_id, COUNT(*) AS product_count FROM products GROUP BY category_id",
    },
    {
        id: "ecom-group-by-2",
        prompt: "Count the number of orders placed by each customer (customer_id, order_count)",
        concepts: ["group-by"],
        difficulty: 1,
        expectedSql:
            "SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id",
    },
    {
        id: "ecom-group-by-3",
        prompt: "Count the number of customers per country (country, customer_count)",
        concepts: ["group-by"],
        difficulty: 1,
        expectedSql:
            "SELECT country, COUNT(*) AS customer_count FROM customers GROUP BY country",
    },
    {
        id: "ecom-group-by-4",
        prompt: "Calculate the total value of each order (order_id, order_total) — multiply quantity by unit_price",
        concepts: ["group-by"],
        difficulty: 1,
        expectedSql:
            "SELECT order_id, SUM(quantity * unit_price) AS order_total FROM order_items GROUP BY order_id",
    },
    {
        id: "ecom-group-by-5",
        prompt: "Find the average rating per product (product_id, avg_rating)",
        concepts: ["group-by"],
        difficulty: 1,
        expectedSql:
            "SELECT product_id, AVG(rating) AS avg_rating FROM reviews GROUP BY product_id",
    },
    {
        id: "ecom-group-by-6",
        prompt: "Count the number of orders per status (status, count)",
        concepts: ["group-by"],
        difficulty: 1,
        expectedSql:
            "SELECT status, COUNT(*) AS count FROM orders GROUP BY status",
    },
    {
        id: "ecom-group-by-7",
        prompt: "Find the total stock per category (category_id, total_stock)",
        concepts: ["group-by"],
        difficulty: 1,
        expectedSql:
            "SELECT category_id, SUM(stock) AS total_stock FROM products GROUP BY category_id",
    },

    // ── having ──────────────────────────────────────────────────────────────────
    {
        id: "ecom-having-1",
        prompt: "Show categories that contain more than 2 products (category_id, product_count)",
        concepts: ["having"],
        difficulty: 2,
        expectedSql:
            "SELECT category_id, COUNT(*) AS product_count FROM products GROUP BY category_id HAVING COUNT(*) > 2",
    },
    {
        id: "ecom-having-2",
        prompt: "Show customers who have placed more than 2 orders (customer_id, order_count)",
        concepts: ["having"],
        difficulty: 2,
        expectedSql:
            "SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id HAVING COUNT(*) > 2",
    },
    {
        id: "ecom-having-3",
        prompt: "Show products with an average review rating of 4 or higher (product_id, avg_rating)",
        concepts: ["having"],
        difficulty: 2,
        expectedSql:
            "SELECT product_id, AVG(rating) AS avg_rating FROM reviews GROUP BY product_id HAVING AVG(rating) >= 4",
    },
    {
        id: "ecom-having-4",
        prompt: "Show countries with more than 2 customers (country, customer_count)",
        concepts: ["having"],
        difficulty: 2,
        expectedSql:
            "SELECT country, COUNT(*) AS customer_count FROM customers GROUP BY country HAVING COUNT(*) > 2",
    },
    {
        id: "ecom-having-5",
        prompt: "Show orders that contain more than 1 line item (order_id, item_count)",
        concepts: ["having"],
        difficulty: 2,
        expectedSql:
            "SELECT order_id, COUNT(*) AS item_count FROM order_items GROUP BY order_id HAVING COUNT(*) > 1",
    },

    // ── join-inner ──────────────────────────────────────────────────────────────
    {
        id: "ecom-join-inner-1",
        prompt: "Show each product with its category name (product name, category name)",
        concepts: ["join-inner"],
        difficulty: 1,
        expectedSql:
            "SELECT p.name AS product, c.name AS category FROM products p JOIN categories c ON p.category_id = c.id",
    },
    {
        id: "ecom-join-inner-2",
        prompt: "Show each order with the customer's name (order id, customer name, status, created_at)",
        concepts: ["join-inner"],
        difficulty: 1,
        expectedSql:
            "SELECT o.id, c.name AS customer, o.status, o.created_at FROM orders o JOIN customers c ON o.customer_id = c.id",
    },
    {
        id: "ecom-join-inner-3",
        prompt: "Show each review with the product name and rating (reviewer customer_id, product name, rating)",
        concepts: ["join-inner"],
        difficulty: 1,
        expectedSql:
            "SELECT r.customer_id, p.name AS product, r.rating FROM reviews r JOIN products p ON r.product_id = p.id",
    },
    {
        id: "ecom-join-inner-4",
        prompt: "Show each order item with the product name (order_id, product name, quantity, unit_price)",
        concepts: ["join-inner"],
        difficulty: 1,
        expectedSql:
            "SELECT oi.order_id, p.name AS product, oi.quantity, oi.unit_price FROM order_items oi JOIN products p ON oi.product_id = p.id",
    },
    {
        id: "ecom-join-inner-5",
        prompt: "Show each review with the reviewer's name (reviewer name, product_id, rating, body)",
        concepts: ["join-inner"],
        difficulty: 1,
        expectedSql:
            "SELECT c.name AS reviewer, r.product_id, r.rating, r.body FROM reviews r JOIN customers c ON r.customer_id = c.id",
    },

    // ── join-left ───────────────────────────────────────────────────────────────
    {
        id: "ecom-join-left-1",
        prompt: "Show all customers and how many orders they have placed, including customers with zero orders (name, order_count)",
        concepts: ["join-left"],
        difficulty: 2,
        expectedSql:
            "SELECT c.name, COUNT(o.id) AS order_count FROM customers c LEFT JOIN orders o ON o.customer_id = c.id GROUP BY c.id, c.name",
    },
    {
        id: "ecom-join-left-2",
        prompt: "Show all products and how many reviews they have received, including unreviewed products (product name, review_count)",
        concepts: ["join-left"],
        difficulty: 2,
        expectedSql:
            "SELECT p.name, COUNT(r.id) AS review_count FROM products p LEFT JOIN reviews r ON r.product_id = p.id GROUP BY p.id, p.name",
    },
    {
        id: "ecom-join-left-3",
        prompt: "Show all customers and their most recent order date, NULL if they have never ordered (name, last_order)",
        concepts: ["join-left"],
        difficulty: 2,
        expectedSql:
            "SELECT c.name, MAX(o.created_at) AS last_order FROM customers c LEFT JOIN orders o ON o.customer_id = c.id GROUP BY c.id, c.name",
    },
    {
        id: "ecom-join-left-4",
        prompt: "Show all products and the total quantity ever sold, 0 if never sold (product name, total_sold)",
        concepts: ["join-left"],
        difficulty: 2,
        expectedSql:
            "SELECT p.name, COALESCE(SUM(oi.quantity), 0) AS total_sold FROM products p LEFT JOIN order_items oi ON oi.product_id = p.id GROUP BY p.id, p.name",
    },
    {
        id: "ecom-join-left-5",
        prompt: "Show all categories and the number of products directly in each, including categories with no products (category name, product_count)",
        concepts: ["join-left"],
        difficulty: 2,
        expectedSql:
            "SELECT c.name, COUNT(p.id) AS product_count FROM categories c LEFT JOIN products p ON p.category_id = c.id GROUP BY c.id, c.name",
    },

    // ── join-multi ──────────────────────────────────────────────────────────────
    {
        id: "ecom-join-multi-1",
        prompt: "Show each review with the reviewer's name and the product name (reviewer name, product name, rating)",
        concepts: ["join-multi"],
        difficulty: 2,
        expectedSql:
            "SELECT c.name AS reviewer, p.name AS product, r.rating FROM reviews r JOIN customers c ON r.customer_id = c.id JOIN products p ON r.product_id = p.id",
    },
    {
        id: "ecom-join-multi-2",
        prompt: "Show each order's total value with the customer's name (customer name, order_id, order_total)",
        concepts: ["join-multi"],
        difficulty: 2,
        expectedSql:
            "SELECT c.name AS customer, o.id AS order_id, SUM(oi.quantity * oi.unit_price) AS order_total FROM orders o JOIN customers c ON o.customer_id = c.id JOIN order_items oi ON oi.order_id = o.id GROUP BY o.id, c.name",
    },
    {
        id: "ecom-join-multi-3",
        prompt: "Show each product's name, its category name, and the minimum supplier cost price (product, category, min_cost)",
        concepts: ["join-multi"],
        difficulty: 2,
        expectedSql:
            "SELECT p.name AS product, c.name AS category, MIN(ps.cost_price) AS min_cost FROM products p JOIN categories c ON p.category_id = c.id JOIN product_suppliers ps ON ps.product_id = p.id GROUP BY p.id, p.name, c.name",
    },
    {
        id: "ecom-join-multi-4",
        prompt: "Show each order item with the customer name, product name, quantity, and line subtotal (customer, product, quantity, subtotal)",
        concepts: ["join-multi"],
        difficulty: 2,
        expectedSql:
            "SELECT c.name AS customer, p.name AS product, oi.quantity, oi.quantity * oi.unit_price AS subtotal FROM order_items oi JOIN orders o ON oi.order_id = o.id JOIN customers c ON o.customer_id = c.id JOIN products p ON oi.product_id = p.id",
    },
    {
        id: "ecom-join-multi-5",
        prompt: "Show each product with its category name and all supplier names (product, category, supplier)",
        concepts: ["join-multi"],
        difficulty: 2,
        expectedSql:
            "SELECT p.name AS product, c.name AS category, s.name AS supplier FROM products p JOIN categories c ON p.category_id = c.id JOIN product_suppliers ps ON ps.product_id = p.id JOIN suppliers s ON ps.supplier_id = s.id",
    },

    // ── join-self ───────────────────────────────────────────────────────────────
    {
        id: "ecom-join-self-1",
        prompt: "Show each subcategory alongside its parent category name (subcategory, parent_category)",
        concepts: ["join-self"],
        difficulty: 2,
        expectedSql:
            "SELECT child.name AS subcategory, parent.name AS parent_category FROM categories child JOIN categories parent ON child.parent_id = parent.id",
    },
    {
        id: "ecom-join-self-2",
        prompt: "Show all pairs of products that share the same category (product1, product2, category_id) — avoid duplicate pairs",
        concepts: ["join-self"],
        difficulty: 2,
        expectedSql:
            "SELECT p1.name AS product1, p2.name AS product2, p1.category_id FROM products p1 JOIN products p2 ON p1.category_id = p2.category_id AND p1.id < p2.id",
    },
    {
        id: "ecom-join-self-3",
        prompt: "Show all pairs of categories that share the same parent (sibling categories) — include their shared parent_id, avoid duplicate pairs (category1, category2, parent_id)",
        concepts: ["join-self"],
        difficulty: 2,
        expectedSql:
            "SELECT a.name AS category1, b.name AS category2, a.parent_id FROM categories a JOIN categories b ON a.parent_id = b.parent_id AND a.id < b.id WHERE a.parent_id IS NOT NULL",
    },

    // ── join-cross ──────────────────────────────────────────────────────────────
    {
        id: "ecom-join-cross-1",
        prompt: "Show every combination of supplier and subcategory (for hypothetical supply deals) — supplier name, category name",
        concepts: ["join-cross"],
        difficulty: 2,
        expectedSql:
            "SELECT s.name AS supplier, c.name AS category FROM suppliers s CROSS JOIN categories c WHERE c.parent_id IS NOT NULL",
    },
    {
        id: "ecom-join-cross-2",
        prompt: "Show every combination of customer tier and order status (tier, status)",
        concepts: ["join-cross"],
        difficulty: 2,
        expectedSql:
            "SELECT t.tier, s.status FROM (SELECT DISTINCT tier FROM customers) t CROSS JOIN (SELECT DISTINCT status FROM orders) s",
    },

    // ── subquery-scalar ─────────────────────────────────────────────────────────
    {
        id: "ecom-subquery-scalar-1",
        prompt: "Show products priced above the overall average product price (name, price)",
        concepts: ["subquery-scalar"],
        difficulty: 2,
        expectedSql:
            "SELECT name, price FROM products WHERE price > (SELECT AVG(price) FROM products)",
    },
    {
        id: "ecom-subquery-scalar-2",
        prompt: "Show the customer(s) with the highest loyalty points (name, loyalty_points)",
        concepts: ["subquery-scalar"],
        difficulty: 2,
        expectedSql:
            "SELECT name, loyalty_points FROM customers WHERE loyalty_points = (SELECT MAX(loyalty_points) FROM customers)",
    },
    {
        id: "ecom-subquery-scalar-3",
        prompt: "Show each product's name, price, and the overall average price side by side (name, price, avg_price)",
        concepts: ["subquery-scalar"],
        difficulty: 2,
        expectedSql:
            "SELECT name, price, (SELECT AVG(price) FROM products) AS avg_price FROM products",
    },
    {
        id: "ecom-subquery-scalar-4",
        prompt: "Show orders placed by the customer with the highest loyalty points (id, status, created_at)",
        concepts: ["subquery-scalar"],
        difficulty: 2,
        expectedSql:
            "SELECT id, status, created_at FROM orders WHERE customer_id = (SELECT id FROM customers ORDER BY loyalty_points DESC LIMIT 1)",
    },

    // ── subquery-in ─────────────────────────────────────────────────────────────
    {
        id: "ecom-subquery-in-1",
        prompt: "Show customers who have placed at least one order (name, email)",
        concepts: ["subquery-in"],
        difficulty: 2,
        expectedSql:
            "SELECT name, email FROM customers WHERE id IN (SELECT DISTINCT customer_id FROM orders)",
    },
    {
        id: "ecom-subquery-in-2",
        prompt: "Show products that have been reviewed at least once (name, price)",
        concepts: ["subquery-in"],
        difficulty: 2,
        expectedSql:
            "SELECT name, price FROM products WHERE id IN (SELECT DISTINCT product_id FROM reviews)",
    },
    {
        id: "ecom-subquery-in-3",
        prompt: "Show customers who have never placed an order (name, email)",
        concepts: ["subquery-in"],
        difficulty: 2,
        expectedSql:
            "SELECT name, email FROM customers WHERE id NOT IN (SELECT DISTINCT customer_id FROM orders)",
    },
    {
        id: "ecom-subquery-in-4",
        prompt: "Show orders that include at least one product from the Laptops category (category_id = 3) — show distinct order ids and status",
        concepts: ["subquery-in"],
        difficulty: 2,
        expectedSql:
            "SELECT DISTINCT o.id, o.status FROM orders o WHERE o.id IN (SELECT oi.order_id FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE p.category_id = 3)",
    },

    // ── subquery-correlated ─────────────────────────────────────────────────────
    {
        id: "ecom-subquery-correlated-1",
        prompt: "Show products priced above the average for their own category (name, category_id, price)",
        concepts: ["subquery-correlated"],
        difficulty: 3,
        expectedSql:
            "SELECT name, category_id, price FROM products p WHERE price > (SELECT AVG(price) FROM products WHERE category_id = p.category_id)",
    },
    {
        id: "ecom-subquery-correlated-2",
        prompt: "Show customers whose loyalty points are above the average for their own tier (name, tier, loyalty_points)",
        concepts: ["subquery-correlated"],
        difficulty: 3,
        expectedSql:
            "SELECT name, tier, loyalty_points FROM customers c WHERE loyalty_points > (SELECT AVG(loyalty_points) FROM customers WHERE tier = c.tier)",
    },
    {
        id: "ecom-subquery-correlated-3",
        prompt: "Show customers who have placed more orders than the average number of orders per customer (name)",
        concepts: ["subquery-correlated"],
        difficulty: 3,
        expectedSql:
            "SELECT name FROM customers c WHERE (SELECT COUNT(*) FROM orders WHERE customer_id = c.id) > (SELECT AVG(cnt) FROM (SELECT COUNT(*) AS cnt FROM orders GROUP BY customer_id) AS t)",
    },

    // ── subquery-derived ────────────────────────────────────────────────────────
    {
        id: "ecom-subquery-derived-1",
        prompt: "Show orders whose total value exceeds $500, using a derived table to pre-compute order totals (order_id, order_total)",
        concepts: ["subquery-derived"],
        difficulty: 2,
        expectedSql:
            "SELECT order_id, order_total FROM (SELECT order_id, SUM(quantity * unit_price) AS order_total FROM order_items GROUP BY order_id) AS t WHERE order_total > 500",
    },
    {
        id: "ecom-subquery-derived-2",
        prompt: "Show products with an average rating of at least 4, using a derived table for per-product averages (product_id, avg_rating)",
        concepts: ["subquery-derived"],
        difficulty: 2,
        expectedSql:
            "SELECT product_id, avg_rating FROM (SELECT product_id, AVG(rating) AS avg_rating FROM reviews GROUP BY product_id) AS t WHERE avg_rating >= 4",
    },
    {
        id: "ecom-subquery-derived-3",
        prompt: "Show customers who have spent more than $1000 in total, using a derived table (customer_id, total_spend)",
        concepts: ["subquery-derived"],
        difficulty: 3,
        expectedSql:
            "SELECT customer_id, total_spend FROM (SELECT o.customer_id, SUM(oi.quantity * oi.unit_price) AS total_spend FROM orders o JOIN order_items oi ON o.id = oi.order_id GROUP BY o.customer_id) AS t WHERE total_spend > 1000",
    },

    // ── exists ──────────────────────────────────────────────────────────────────
    {
        id: "ecom-exists-1",
        prompt: "Show products that have received at least one review (name, price)",
        concepts: ["exists"],
        difficulty: 2,
        expectedSql:
            "SELECT name, price FROM products p WHERE EXISTS (SELECT 1 FROM reviews r WHERE r.product_id = p.id)",
    },
    {
        id: "ecom-exists-2",
        prompt: "Show products that appear in at least one delivered order (name, price)",
        concepts: ["exists"],
        difficulty: 2,
        expectedSql:
            "SELECT name, price FROM products p WHERE EXISTS (SELECT 1 FROM order_items oi JOIN orders o ON oi.order_id = o.id WHERE oi.product_id = p.id AND o.status = 'delivered')",
    },
    {
        id: "ecom-exists-3",
        prompt: "Show customers who have placed at least one delivered order (name, email)",
        concepts: ["exists"],
        difficulty: 2,
        expectedSql:
            "SELECT name, email FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id AND o.status = 'delivered')",
    },
    {
        id: "ecom-exists-4",
        prompt: "Show products that appear in at least one cancelled order (name, price)",
        concepts: ["exists"],
        difficulty: 2,
        expectedSql:
            "SELECT name, price FROM products p WHERE EXISTS (SELECT 1 FROM order_items oi JOIN orders o ON oi.order_id = o.id WHERE oi.product_id = p.id AND o.status = 'cancelled')",
    },

    // ── union ───────────────────────────────────────────────────────────────────
    {
        id: "ecom-union-1",
        prompt: "List all contact email addresses from both the customers table and the suppliers table, aliased as 'email'",
        concepts: ["union"],
        difficulty: 2,
        expectedSql:
            "SELECT email FROM customers UNION SELECT contact_email AS email FROM suppliers",
    },
    {
        id: "ecom-union-2",
        prompt: "List all distinct countries that appear in either the customers table or the suppliers table, aliased as 'country'",
        concepts: ["union"],
        difficulty: 2,
        expectedSql:
            "SELECT country FROM customers UNION SELECT country FROM suppliers",
    },
    {
        id: "ecom-union-3",
        prompt: "List the names of all customers and all suppliers in one combined list, aliased as 'name'",
        concepts: ["union"],
        difficulty: 2,
        expectedSql:
            "SELECT name FROM customers UNION SELECT name FROM suppliers",
    },

    // ── union-all ────────────────────────────────────────────────────────────────
    {
        id: "ecom-union-all-1",
        prompt: "Show all product IDs referenced in order_items combined with all product IDs in reviews, keeping duplicates (product_id)",
        concepts: ["union-all"],
        difficulty: 2,
        expectedSql:
            "SELECT product_id FROM order_items UNION ALL SELECT product_id FROM reviews",
    },
    {
        id: "ecom-union-all-2",
        prompt: "Show all customer IDs from orders combined with all customer IDs from reviews, keeping duplicates (customer_id)",
        concepts: ["union-all"],
        difficulty: 2,
        expectedSql:
            "SELECT customer_id FROM orders UNION ALL SELECT customer_id FROM reviews",
    },

    // ── intersect ────────────────────────────────────────────────────────────────
    {
        id: "ecom-intersect-1",
        prompt: "Show product IDs that appear in both order_items AND reviews — products that were both bought and reviewed (product_id)",
        concepts: ["intersect"],
        difficulty: 2,
        expectedSql:
            "SELECT product_id FROM order_items INTERSECT SELECT product_id FROM reviews",
    },
    {
        id: "ecom-intersect-2",
        prompt: "Show customer IDs that appear in both orders AND reviews — customers who both ordered and reviewed (customer_id)",
        concepts: ["intersect"],
        difficulty: 2,
        expectedSql:
            "SELECT customer_id FROM orders INTERSECT SELECT customer_id FROM reviews",
    },

    // ── except ───────────────────────────────────────────────────────────────────
    {
        id: "ecom-except-1",
        prompt: "Show supplier IDs that supply phones (category_id = 2) but NOT laptops (category_id = 3) — use EXCEPT",
        concepts: ["except"],
        difficulty: 2,
        expectedSql:
            "SELECT ps.supplier_id FROM product_suppliers ps JOIN products p ON ps.product_id = p.id WHERE p.category_id = 2 EXCEPT SELECT ps.supplier_id FROM product_suppliers ps JOIN products p ON ps.product_id = p.id WHERE p.category_id = 3",
    },
    {
        id: "ecom-except-2",
        prompt: "Show product IDs that appear in order_items but have never been reviewed — use EXCEPT (product_id)",
        concepts: ["except"],
        difficulty: 2,
        expectedSql:
            "SELECT product_id FROM order_items EXCEPT SELECT product_id FROM reviews",
    },
    {
        id: "ecom-except-3",
        prompt: "Show customer IDs who have reviewed something but have never placed an order — use EXCEPT (customer_id)",
        concepts: ["except"],
        difficulty: 2,
        expectedSql:
            "SELECT customer_id FROM reviews EXCEPT SELECT customer_id FROM orders",
    },

    // ── case-simple ──────────────────────────────────────────────────────────────
    {
        id: "ecom-case-simple-1",
        prompt: "Show each order's id and a human-readable status label using CASE (e.g. 'delivered' → 'Delivered') — columns: id, status_label",
        concepts: ["case-simple"],
        difficulty: 2,
        expectedSql:
            "SELECT id, CASE status WHEN 'delivered' THEN 'Delivered' WHEN 'shipped' THEN 'Shipped' WHEN 'pending' THEN 'Pending' WHEN 'cancelled' THEN 'Cancelled' END AS status_label FROM orders",
    },
    {
        id: "ecom-case-simple-2",
        prompt: "Show each review's product_id, rating, and a label (5 = 'Excellent', 4 = 'Good', 3 = 'Average', 2 = 'Poor', 1 = 'Terrible') using CASE — columns: product_id, rating, rating_label",
        concepts: ["case-simple"],
        difficulty: 2,
        expectedSql:
            "SELECT product_id, rating, CASE rating WHEN 5 THEN 'Excellent' WHEN 4 THEN 'Good' WHEN 3 THEN 'Average' WHEN 2 THEN 'Poor' WHEN 1 THEN 'Terrible' END AS rating_label FROM reviews",
    },
    {
        id: "ecom-case-simple-3",
        prompt: "Show each customer's name, tier, and a 'tier_rank' number using CASE (bronze = 1, silver = 2, gold = 3) — columns: name, tier, tier_rank",
        concepts: ["case-simple"],
        difficulty: 2,
        expectedSql:
            "SELECT name, tier, CASE tier WHEN 'bronze' THEN 1 WHEN 'silver' THEN 2 WHEN 'gold' THEN 3 END AS tier_rank FROM customers",
    },

    // ── case-searched ────────────────────────────────────────────────────────────
    {
        id: "ecom-case-searched-1",
        prompt: "Label each product by price band using CASE WHEN: under $50 = 'Budget', $50–$500 = 'Mid-range', over $500 = 'Premium' — columns: name, price, price_band",
        concepts: ["case-searched"],
        difficulty: 2,
        expectedSql:
            "SELECT name, price, CASE WHEN price < 50 THEN 'Budget' WHEN price <= 500 THEN 'Mid-range' ELSE 'Premium' END AS price_band FROM products",
    },
    {
        id: "ecom-case-searched-2",
        prompt: "Label each customer by loyalty points using CASE WHEN: 2000+ = 'VIP', 1000–1999 = 'Loyal', 500–999 = 'Regular', under 500 = 'New' — columns: name, loyalty_points, customer_label",
        concepts: ["case-searched"],
        difficulty: 2,
        expectedSql:
            "SELECT name, loyalty_points, CASE WHEN loyalty_points >= 2000 THEN 'VIP' WHEN loyalty_points >= 1000 THEN 'Loyal' WHEN loyalty_points >= 500 THEN 'Regular' ELSE 'New' END AS customer_label FROM customers",
    },
    {
        id: "ecom-case-searched-3",
        prompt: "Label each order as 'Completed', 'In Transit', 'Awaiting', or 'Cancelled' using CASE WHEN on status — columns: id, status, progress",
        concepts: ["case-searched"],
        difficulty: 2,
        expectedSql:
            "SELECT id, status, CASE WHEN status = 'delivered' THEN 'Completed' WHEN status = 'shipped' THEN 'In Transit' WHEN status = 'pending' THEN 'Awaiting' ELSE 'Cancelled' END AS progress FROM orders",
    },
    {
        id: "ecom-case-searched-4",
        prompt: "Label each product's stock level using CASE WHEN: 0 = 'Out of stock', under 30 = 'Low', 30–100 = 'Medium', over 100 = 'High' — columns: name, stock, stock_level",
        concepts: ["case-searched"],
        difficulty: 2,
        expectedSql:
            "SELECT name, stock, CASE WHEN stock = 0 THEN 'Out of stock' WHEN stock < 30 THEN 'Low' WHEN stock <= 100 THEN 'Medium' ELSE 'High' END AS stock_level FROM products",
    },

    // ── coalesce ─────────────────────────────────────────────────────────────────
    {
        id: "ecom-coalesce-1",
        prompt: "Show each category's name and its parent_id, replacing NULL with 'Top-level' (name, parent)",
        concepts: ["coalesce"],
        difficulty: 2,
        expectedSql:
            "SELECT name, COALESCE(CAST(parent_id AS TEXT), 'Top-level') AS parent FROM categories",
    },
    {
        id: "ecom-coalesce-2",
        prompt: "Show each customer's name and loyalty points, replacing 0 with NULL using NULLIF (name, points)",
        concepts: ["coalesce"],
        difficulty: 2,
        expectedSql:
            "SELECT name, NULLIF(loyalty_points, 0) AS points FROM customers",
    },
    {
        id: "ecom-coalesce-3",
        prompt: "Show each product's name and weight, defaulting to 0.0 where weight is not recorded (name, weight)",
        concepts: ["coalesce"],
        difficulty: 2,
        expectedSql:
            "SELECT name, COALESCE(weight, 0.0) AS weight FROM products",
    },

    // ── cast ─────────────────────────────────────────────────────────────────────
    {
        id: "ecom-cast-1",
        prompt: "Show each product's name and price truncated to an integer using CAST (name, price_int)",
        concepts: ["cast"],
        difficulty: 2,
        expectedSql:
            "SELECT name, CAST(price AS INTEGER) AS price_int FROM products",
    },
    {
        id: "ecom-cast-2",
        prompt: "Show each customer's name and join year as an integer using CAST and SUBSTR (name, join_year)",
        concepts: ["cast"],
        difficulty: 2,
        engines: ["sqlite"],
        expectedSql:
            "SELECT name, CAST(SUBSTR(joined_at, 1, 4) AS INTEGER) AS join_year FROM customers",
    },
    {
        id: "ecom-cast-3",
        prompt: "Show each customer's name and loyalty points divided by 100.0 as a real number, aliased as points_in_hundreds (name, points_in_hundreds)",
        concepts: ["cast"],
        difficulty: 2,
        expectedSql:
            "SELECT name, CAST(loyalty_points AS REAL) / 100.0 AS points_in_hundreds FROM customers",
    },

    // ── string-basic ─────────────────────────────────────────────────────────────
    {
        id: "ecom-string-basic-1",
        prompt: "Show all product names in uppercase (name_upper)",
        concepts: ["string-basic"],
        difficulty: 1,
        expectedSql: "SELECT UPPER(name) AS name_upper FROM products",
    },
    {
        id: "ecom-string-basic-2",
        prompt: "Show each product's name and the character length of its name, ordered by length descending (name, name_length)",
        concepts: ["string-basic"],
        difficulty: 1,
        expectedSql:
            "SELECT name, LENGTH(name) AS name_length FROM products ORDER BY name_length DESC",
    },
    {
        id: "ecom-string-basic-3",
        prompt: "Show all customer names in lowercase (name_lower)",
        concepts: ["string-basic"],
        difficulty: 1,
        expectedSql: "SELECT LOWER(name) AS name_lower FROM customers",
    },
    {
        id: "ecom-string-basic-4",
        prompt: "Show each customer's name and the length of their email address, ordered by email length descending (name, email_length)",
        concepts: ["string-basic"],
        difficulty: 1,
        expectedSql:
            "SELECT name, LENGTH(email) AS email_length FROM customers ORDER BY email_length DESC",
    },

    // ── string-concat ─────────────────────────────────────────────────────────────
    {
        id: "ecom-string-concat-1",
        prompt: "Format each customer as 'Name <email>' using string concatenation, aliased as formatted (formatted)",
        concepts: ["string-concat"],
        difficulty: 2,
        expectedSql:
            "SELECT name || ' <' || email || '>' AS formatted FROM customers",
    },
    {
        id: "ecom-string-concat-2",
        prompt: "Format each product as 'name ($price)' using string concatenation — cast price to TEXT, aliased as product_label",
        concepts: ["string-concat"],
        difficulty: 2,
        expectedSql:
            "SELECT name || ' ($' || CAST(price AS TEXT) || ')' AS product_label FROM products",
    },
    {
        id: "ecom-string-concat-3",
        prompt: "Format each order as 'Order #id - status' using string concatenation, aliased as order_label",
        concepts: ["string-concat"],
        difficulty: 2,
        expectedSql:
            "SELECT 'Order #' || CAST(id AS TEXT) || ' - ' || status AS order_label FROM orders",
    },

    // ── cte-basic ─────────────────────────────────────────────────────────────────
    {
        id: "ecom-cte-basic-1",
        prompt: "Use a CTE called avg_price to find the average product price, then list all products priced above it (name, price)",
        concepts: ["cte-basic"],
        difficulty: 2,
        expectedSql: `WITH avg_price AS (
  SELECT AVG(price) AS val FROM products
)
SELECT name, price FROM products, avg_price WHERE price > val`,
    },
    {
        id: "ecom-cte-basic-2",
        prompt: "Use a CTE called order_totals to compute each order's total value, then show orders with a total above $500 (order_id, total)",
        concepts: ["cte-basic"],
        difficulty: 2,
        expectedSql: `WITH order_totals AS (
  SELECT order_id, SUM(quantity * unit_price) AS total FROM order_items GROUP BY order_id
)
SELECT order_id, total FROM order_totals WHERE total > 500`,
    },
    {
        id: "ecom-cte-basic-3",
        prompt: "Use a CTE called order_counts to count each customer's orders, then show customers with more than 1 order (customer_id, cnt)",
        concepts: ["cte-basic"],
        difficulty: 2,
        expectedSql: `WITH order_counts AS (
  SELECT customer_id, COUNT(*) AS cnt FROM orders GROUP BY customer_id
)
SELECT customer_id, cnt FROM order_counts WHERE cnt > 1`,
    },
    {
        id: "ecom-cte-basic-4",
        prompt: "Use a CTE called review_counts to count reviews per product, then show products with more than 2 reviews (product_id, review_count)",
        concepts: ["cte-basic"],
        difficulty: 2,
        expectedSql: `WITH review_counts AS (
  SELECT product_id, COUNT(*) AS review_count FROM reviews GROUP BY product_id
)
SELECT product_id, review_count FROM review_counts WHERE review_count > 2`,
    },

    // ── cte-multi ─────────────────────────────────────────────────────────────────
    {
        id: "ecom-cte-multi-1",
        prompt: "Use two CTEs — order_totals (per order) and customer_totals (summed per customer) — then show the top-spending customer (customer_id, lifetime_spend)",
        concepts: ["cte-multi"],
        difficulty: 3,
        expectedSql: `WITH order_totals AS (
  SELECT order_id, SUM(quantity * unit_price) AS total FROM order_items GROUP BY order_id
),
customer_totals AS (
  SELECT o.customer_id, SUM(ot.total) AS lifetime_spend FROM orders o JOIN order_totals ot ON o.id = ot.order_id GROUP BY o.customer_id
)
SELECT customer_id, lifetime_spend FROM customer_totals ORDER BY lifetime_spend DESC LIMIT 1`,
    },
    {
        id: "ecom-cte-multi-2",
        prompt: "Use two CTEs — active_products (is_active = 1) and avg_ratings (avg rating per product) — then show active products with an average rating of 4 or above (name, price, avg_rating)",
        concepts: ["cte-multi"],
        difficulty: 3,
        expectedSql: `WITH active_products AS (
  SELECT id, name, price FROM products WHERE is_active = 1
),
avg_ratings AS (
  SELECT product_id, AVG(rating) AS avg_rating FROM reviews GROUP BY product_id
)
SELECT a.name, a.price, r.avg_rating FROM active_products a JOIN avg_ratings r ON a.id = r.product_id WHERE r.avg_rating >= 4`,
    },
    {
        id: "ecom-cte-multi-3",
        prompt: "Use two CTEs — gold_customers (tier = 'gold') and order_counts (orders per customer) — then show gold customers with 2 or more orders (name, cnt)",
        concepts: ["cte-multi"],
        difficulty: 3,
        expectedSql: `WITH gold_customers AS (
  SELECT id, name FROM customers WHERE tier = 'gold'
),
order_counts AS (
  SELECT customer_id, COUNT(*) AS cnt FROM orders GROUP BY customer_id
)
SELECT g.name, oc.cnt FROM gold_customers g JOIN order_counts oc ON g.id = oc.customer_id WHERE oc.cnt >= 2`,
    },

    // ── cte-recursive ─────────────────────────────────────────────────────────────
    {
        id: "ecom-cte-recursive-1",
        prompt: "Use a recursive CTE to build the full path for every category (e.g. 'Electronics > Phones') — columns: id, path",
        concepts: ["cte-recursive"],
        difficulty: 3,
        expectedSql: `WITH RECURSIVE category_path(id, name, path) AS (
  SELECT id, name, name FROM categories WHERE parent_id IS NULL
  UNION ALL
  SELECT c.id, c.name, cp.path || ' > ' || c.name
  FROM categories c JOIN category_path cp ON c.parent_id = cp.id
)
SELECT id, path FROM category_path ORDER BY id`,
    },
    {
        id: "ecom-cte-recursive-2",
        prompt: "Use a recursive CTE to find all ancestors of the 'Phones' category (id, name)",
        concepts: ["cte-recursive"],
        difficulty: 3,
        expectedSql: `WITH RECURSIVE ancestors(id, name, parent_id) AS (
  SELECT id, name, parent_id FROM categories WHERE name = 'Phones'
  UNION ALL
  SELECT c.id, c.name, c.parent_id FROM categories c JOIN ancestors a ON c.id = a.parent_id
)
SELECT id, name FROM ancestors`,
    },

    // ── window-row-number ─────────────────────────────────────────────────────────
    {
        id: "ecom-window-row-number-1",
        prompt: "Number products by price within each category, most expensive first (name, category_id, price, rn)",
        concepts: ["window-row-number"],
        difficulty: 2,
        expectedSql:
            "SELECT name, category_id, price, ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY price DESC) AS rn FROM products",
    },
    {
        id: "ecom-window-row-number-2",
        prompt: "Number each customer's orders chronologically (customer_id, created_at, order_num)",
        concepts: ["window-row-number"],
        difficulty: 2,
        expectedSql:
            "SELECT customer_id, created_at, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY created_at ASC) AS order_num FROM orders",
    },
    {
        id: "ecom-window-row-number-3",
        prompt: "Assign a row number to each customer ranked by loyalty points descending (name, loyalty_points, rank)",
        concepts: ["window-row-number"],
        difficulty: 2,
        expectedSql:
            "SELECT name, loyalty_points, ROW_NUMBER() OVER (ORDER BY loyalty_points DESC) AS rank FROM customers",
    },
    {
        id: "ecom-window-row-number-4",
        prompt: "Number reviews per product by rating descending (product_id, rating, rn)",
        concepts: ["window-row-number"],
        difficulty: 2,
        expectedSql:
            "SELECT product_id, rating, ROW_NUMBER() OVER (PARTITION BY product_id ORDER BY rating DESC) AS rn FROM reviews",
    },

    // ── window-rank ───────────────────────────────────────────────────────────────
    {
        id: "ecom-window-rank-1",
        prompt: "Rank products by price within each category using RANK(), most expensive first (name, category_id, price, price_rank)",
        concepts: ["window-rank"],
        difficulty: 2,
        expectedSql:
            "SELECT name, category_id, price, RANK() OVER (PARTITION BY category_id ORDER BY price DESC) AS price_rank FROM products",
    },
    {
        id: "ecom-window-rank-2",
        prompt: "Rank all customers by loyalty points using RANK() (name, loyalty_points, rank)",
        concepts: ["window-rank"],
        difficulty: 2,
        expectedSql:
            "SELECT name, loyalty_points, RANK() OVER (ORDER BY loyalty_points DESC) AS rank FROM customers",
    },
    {
        id: "ecom-window-rank-3",
        prompt: "Assign a DENSE_RANK to products by price (no gaps in ranking for ties) — name, price, dense_rank",
        concepts: ["window-rank"],
        difficulty: 2,
        expectedSql:
            "SELECT name, price, DENSE_RANK() OVER (ORDER BY price DESC) AS dense_rank FROM products",
    },
    {
        id: "ecom-window-rank-4",
        prompt: "Rank orders by total value using RANK() — compute total per order using a subquery or CTE (order_id, order_total, value_rank)",
        concepts: ["window-rank"],
        difficulty: 3,
        expectedSql:
            "SELECT order_id, SUM(quantity * unit_price) AS order_total, RANK() OVER (ORDER BY SUM(quantity * unit_price) DESC) AS value_rank FROM order_items GROUP BY order_id",
    },

    // ── window-ntile ──────────────────────────────────────────────────────────────
    {
        id: "ecom-window-ntile-1",
        prompt: "Divide products into 4 price quartiles using NTILE(4), cheapest first (name, price, quartile)",
        concepts: ["window-ntile"],
        difficulty: 2,
        expectedSql:
            "SELECT name, price, NTILE(4) OVER (ORDER BY price ASC) AS quartile FROM products",
    },
    {
        id: "ecom-window-ntile-2",
        prompt: "Divide customers into 3 groups by loyalty points descending using NTILE(3) (name, loyalty_points, group_num)",
        concepts: ["window-ntile"],
        difficulty: 2,
        expectedSql:
            "SELECT name, loyalty_points, NTILE(3) OVER (ORDER BY loyalty_points DESC) AS group_num FROM customers",
    },
    {
        id: "ecom-window-ntile-3",
        prompt: "Divide order items into 2 halves by unit_price descending using NTILE(2) (order_id, product_id, unit_price, half)",
        concepts: ["window-ntile"],
        difficulty: 2,
        expectedSql:
            "SELECT order_id, product_id, unit_price, NTILE(2) OVER (ORDER BY unit_price DESC) AS half FROM order_items",
    },

    // ── window-lag-lead ───────────────────────────────────────────────────────────
    {
        id: "ecom-window-lag-lead-1",
        prompt: "Show each order alongside the previous order date for the same customer using LAG() (customer_id, created_at, prev_order)",
        concepts: ["window-lag-lead"],
        difficulty: 3,
        expectedSql:
            "SELECT customer_id, created_at, LAG(created_at) OVER (PARTITION BY customer_id ORDER BY created_at) AS prev_order FROM orders",
    },
    {
        id: "ecom-window-lag-lead-2",
        prompt: "Show each order alongside the next order date for the same customer using LEAD() (customer_id, created_at, next_order)",
        concepts: ["window-lag-lead"],
        difficulty: 3,
        expectedSql:
            "SELECT customer_id, created_at, LEAD(created_at) OVER (PARTITION BY customer_id ORDER BY created_at) AS next_order FROM orders",
    },
    {
        id: "ecom-window-lag-lead-3",
        prompt: "Show each review alongside the previous rating for the same product using LAG() (product_id, created_at, rating, prev_rating)",
        concepts: ["window-lag-lead"],
        difficulty: 3,
        expectedSql:
            "SELECT product_id, created_at, rating, LAG(rating) OVER (PARTITION BY product_id ORDER BY created_at) AS prev_rating FROM reviews",
    },

    // ── window-running-total ──────────────────────────────────────────────────────
    {
        id: "ecom-window-running-total-1",
        prompt: "Show each product's name and price alongside a running total of prices, ordered by price ascending (name, price, running_total)",
        concepts: ["window-running-total"],
        difficulty: 2,
        expectedSql:
            "SELECT name, price, SUM(price) OVER (ORDER BY price ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total FROM products ORDER BY price ASC",
    },
    {
        id: "ecom-window-running-total-2",
        prompt: "Show each customer's name and loyalty_points alongside a running total within their tier, ordered by customer id (name, tier, loyalty_points, running_total)",
        concepts: ["window-running-total"],
        difficulty: 3,
        expectedSql:
            "SELECT name, tier, loyalty_points, SUM(loyalty_points) OVER (PARTITION BY tier ORDER BY id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total FROM customers",
    },
    {
        id: "ecom-window-running-total-3",
        prompt: "Show each order and a running count of orders per customer over time (customer_id, created_at, running_count)",
        concepts: ["window-running-total"],
        difficulty: 3,
        expectedSql:
            "SELECT customer_id, created_at, COUNT(*) OVER (PARTITION BY customer_id ORDER BY created_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_count FROM orders",
    },

    // ── window-partition ──────────────────────────────────────────────────────────
    {
        id: "ecom-window-partition-1",
        prompt: "Show each product alongside the average price in its category (name, category_id, price, category_avg)",
        concepts: ["window-partition"],
        difficulty: 2,
        expectedSql:
            "SELECT name, category_id, price, AVG(price) OVER (PARTITION BY category_id) AS category_avg FROM products",
    },
    {
        id: "ecom-window-partition-2",
        prompt: "Show each customer alongside the maximum loyalty points in their tier (name, tier, loyalty_points, tier_max)",
        concepts: ["window-partition"],
        difficulty: 2,
        expectedSql:
            "SELECT name, tier, loyalty_points, MAX(loyalty_points) OVER (PARTITION BY tier) AS tier_max FROM customers",
    },
    {
        id: "ecom-window-partition-3",
        prompt: "Show each review alongside the average rating for its product (customer_id, product_id, rating, product_avg_rating)",
        concepts: ["window-partition"],
        difficulty: 2,
        expectedSql:
            "SELECT customer_id, product_id, rating, AVG(rating) OVER (PARTITION BY product_id) AS product_avg_rating FROM reviews",
    },
    {
        id: "ecom-window-partition-4",
        prompt: "Show each order alongside a count of all orders with the same status (id, status, status_count)",
        concepts: ["window-partition"],
        difficulty: 2,
        expectedSql:
            "SELECT id, status, COUNT(*) OVER (PARTITION BY status) AS status_count FROM orders",
    },

    // ── window-frame ──────────────────────────────────────────────────────────────
    {
        id: "ecom-window-frame-1",
        prompt: "Show each product's name and price alongside a running total using an explicit ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW frame, ordered by price (name, price, running_total)",
        concepts: ["window-frame"],
        difficulty: 3,
        expectedSql:
            "SELECT name, price, SUM(price) OVER (ORDER BY price ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total FROM products ORDER BY price ASC",
    },
    {
        id: "ecom-window-frame-2",
        prompt: "Show each review's product_id, created_at, rating, and a 3-row rolling average rating per product using ROWS BETWEEN 2 PRECEDING AND CURRENT ROW (product_id, created_at, rating, rolling_avg)",
        concepts: ["window-frame"],
        difficulty: 3,
        expectedSql:
            "SELECT product_id, created_at, rating, AVG(rating) OVER (PARTITION BY product_id ORDER BY created_at ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS rolling_avg FROM reviews",
    },
    {
        id: "ecom-window-frame-3",
        prompt: "Show each order and a rolling count of orders over the preceding 2 rows and current row, ordered by created_at (id, created_at, rolling_count)",
        concepts: ["window-frame"],
        difficulty: 3,
        expectedSql:
            "SELECT id, created_at, COUNT(*) OVER (ORDER BY created_at ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS rolling_count FROM orders",
    },

    // ── window-first-last ─────────────────────────────────────────────────────────
    {
        id: "ecom-window-first-last-1",
        prompt: "Show each product alongside the cheapest price in its category using FIRST_VALUE (name, category_id, price, cheapest_in_category)",
        concepts: ["window-first-last"],
        difficulty: 3,
        expectedSql:
            "SELECT name, category_id, price, FIRST_VALUE(price) OVER (PARTITION BY category_id ORDER BY price ASC) AS cheapest_in_category FROM products",
    },
    {
        id: "ecom-window-first-last-2",
        prompt: "Show each review alongside the date of the first review for the same product using FIRST_VALUE (product_id, created_at, rating, first_reviewed)",
        concepts: ["window-first-last"],
        difficulty: 3,
        expectedSql:
            "SELECT product_id, created_at, rating, FIRST_VALUE(created_at) OVER (PARTITION BY product_id ORDER BY created_at ASC) AS first_reviewed FROM reviews",
    },
    {
        id: "ecom-window-first-last-3",
        prompt: "Show each order alongside the most recent order date for the same customer using LAST_VALUE with an unbounded frame (customer_id, id, created_at, latest_order)",
        concepts: ["window-first-last"],
        difficulty: 3,
        expectedSql:
            "SELECT customer_id, id, created_at, LAST_VALUE(created_at) OVER (PARTITION BY customer_id ORDER BY created_at ASC ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS latest_order FROM orders",
    },

    // ── sqlite-strftime ───────────────────────────────────────────────────────────
    {
        id: "ecom-sqlite-strftime-1",
        prompt: "Show each customer's name and the year they joined using strftime (name, join_year)",
        concepts: ["sqlite-strftime"],
        difficulty: 1,
        engines: ["sqlite"],
        expectedSql:
            "SELECT name, strftime('%Y', joined_at) AS join_year FROM customers",
    },
    {
        id: "ecom-sqlite-strftime-2",
        prompt: "Show the number of orders placed each month (formatted as YYYY-MM) using strftime (month, order_count)",
        concepts: ["sqlite-strftime"],
        difficulty: 2,
        engines: ["sqlite"],
        expectedSql:
            "SELECT strftime('%Y-%m', created_at) AS month, COUNT(*) AS order_count FROM orders GROUP BY strftime('%Y-%m', created_at)",
    },
    {
        id: "ecom-sqlite-strftime-3",
        prompt: "Show customers who joined before 2023 using strftime to extract the year (name, joined_at)",
        concepts: ["sqlite-strftime"],
        difficulty: 2,
        engines: ["sqlite"],
        expectedSql:
            "SELECT name, joined_at FROM customers WHERE strftime('%Y', joined_at) < '2023'",
    },
    {
        id: "ecom-sqlite-strftime-4",
        prompt: "Show the number of reviews submitted each month using strftime (month, review_count)",
        concepts: ["sqlite-strftime"],
        difficulty: 2,
        engines: ["sqlite"],
        expectedSql:
            "SELECT strftime('%Y-%m', created_at) AS month, COUNT(*) AS review_count FROM reviews GROUP BY strftime('%Y-%m', created_at)",
    },

    // ── sqlite-json ───────────────────────────────────────────────────────────────
    {
        id: "ecom-sqlite-json-1",
        prompt: "Build a JSON object for each product containing its id, name, and price using json_object (product_json)",
        concepts: ["sqlite-json"],
        difficulty: 2,
        engines: ["sqlite"],
        expectedSql:
            "SELECT json_object('id', id, 'name', name, 'price', price) AS product_json FROM products",
    },
    {
        id: "ecom-sqlite-json-2",
        prompt: "Build a JSON array of all customer names using json_group_array (names)",
        concepts: ["sqlite-json"],
        difficulty: 2,
        engines: ["sqlite"],
        expectedSql: "SELECT json_group_array(name) AS names FROM customers",
    },
    {
        id: "ecom-sqlite-json-3",
        prompt: "Build a JSON object per product with name and stock, then extract the stock value back out using json_extract — aliased as extracted_stock (extracted_stock)",
        concepts: ["sqlite-json"],
        difficulty: 3,
        engines: ["sqlite"],
        expectedSql:
            "SELECT json_extract(json_object('name', name, 'stock', stock), '$.stock') AS extracted_stock FROM products",
    },

    // ── pg-date ───────────────────────────────────────────────────────────────────
    {
        id: "ecom-pg-date-1",
        prompt: "Show each customer's name and the year they joined using EXTRACT (name, join_year)",
        concepts: ["pg-date"],
        difficulty: 1,
        engines: ["pg"],
        expectedSql:
            "SELECT name, EXTRACT(year FROM joined_at)::INTEGER AS join_year FROM customers",
    },
    {
        id: "ecom-pg-date-2",
        prompt: "Show the number of orders placed each month (formatted as YYYY-MM) using TO_CHAR (month, order_count)",
        concepts: ["pg-date"],
        difficulty: 2,
        engines: ["pg"],
        expectedSql:
            "SELECT TO_CHAR(created_at, 'YYYY-MM') AS month, COUNT(*) AS order_count FROM orders GROUP BY TO_CHAR(created_at, 'YYYY-MM')",
    },
    {
        id: "ecom-pg-date-3",
        prompt: "Show customers who joined before 2023 using EXTRACT to get the year (name, joined_at)",
        concepts: ["pg-date"],
        difficulty: 2,
        engines: ["pg"],
        expectedSql:
            "SELECT name, joined_at FROM customers WHERE EXTRACT(year FROM joined_at) < 2023",
    },
    {
        id: "ecom-pg-date-4",
        prompt: "Show the number of reviews submitted each month using TO_CHAR (month, review_count)",
        concepts: ["pg-date"],
        difficulty: 2,
        engines: ["pg"],
        expectedSql:
            "SELECT TO_CHAR(created_at, 'YYYY-MM') AS month, COUNT(*) AS review_count FROM reviews GROUP BY TO_CHAR(created_at, 'YYYY-MM')",
    },
    {
        id: "ecom-pg-date-5",
        prompt: "Show each customer's name and join month number using EXTRACT (name, join_month)",
        concepts: ["pg-date"],
        difficulty: 1,
        engines: ["pg"],
        expectedSql:
            "SELECT name, EXTRACT(month FROM joined_at)::INTEGER AS join_month FROM customers",
    },
    {
        id: "ecom-pg-date-6",
        prompt: "Show the number of orders placed in each year using DATE_TRUNC to bucket by year (year, order_count)",
        concepts: ["pg-date"],
        difficulty: 2,
        engines: ["pg"],
        expectedSql:
            "SELECT DATE_TRUNC('year', created_at) AS year, COUNT(*) AS order_count FROM orders GROUP BY DATE_TRUNC('year', created_at) ORDER BY year",
    },
    {
        id: "ecom-pg-date-7",
        prompt: "Show orders placed in Q1 2024 (January–March) — use EXTRACT for year and month filtering (id, customer_id, status, created_at)",
        concepts: ["pg-date"],
        difficulty: 2,
        engines: ["pg"],
        expectedSql:
            "SELECT id, customer_id, status, created_at FROM orders WHERE EXTRACT(year FROM created_at) = 2024 AND EXTRACT(month FROM created_at) BETWEEN 1 AND 3",
    },

    // ── pg-json ───────────────────────────────────────────────────────────────────
    {
        id: "ecom-pg-json-1",
        prompt: "Build a JSON object for each product containing its id, name, and price using json_build_object (product_json)",
        concepts: ["pg-json"],
        difficulty: 2,
        engines: ["pg"],
        expectedSql:
            "SELECT json_build_object('id', id, 'name', name, 'price', price) AS product_json FROM products",
    },
    {
        id: "ecom-pg-json-2",
        prompt: "Build a JSON array of all customer names using json_agg (names)",
        concepts: ["pg-json"],
        difficulty: 2,
        engines: ["pg"],
        expectedSql: "SELECT json_agg(name) AS names FROM customers",
    },
    {
        id: "ecom-pg-json-3",
        prompt: "Build a JSON object per product with name and stock, then extract the stock value back out as an integer using the ->> operator with a cast — aliased as extracted_stock (extracted_stock)",
        concepts: ["pg-json"],
        difficulty: 3,
        engines: ["pg"],
        expectedSql:
            "SELECT (json_build_object('name', name, 'stock', stock)->>'stock')::INTEGER AS extracted_stock FROM products",
    },
    {
        id: "ecom-pg-json-4",
        prompt: "For each category, build a JSON array of all product names in that category using json_agg — show category_id and product_names",
        concepts: ["pg-json"],
        difficulty: 3,
        engines: ["pg"],
        expectedSql:
            "SELECT category_id, json_agg(name ORDER BY name) AS product_names FROM products GROUP BY category_id",
    },
    {
        id: "ecom-pg-json-5",
        prompt: "Build a JSON object for each order with its id and status, then extract the status back out using ->> — aliased as order_status (order_status)",
        concepts: ["pg-json"],
        difficulty: 2,
        engines: ["pg"],
        expectedSql:
            "SELECT (json_build_object('id', id, 'status', status)->>'status') AS order_status FROM orders",
    },
];

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  parent_id INTEGER REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS suppliers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  contact_email TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  price REAL NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1,
  weight REAL
);

CREATE TABLE IF NOT EXISTS product_suppliers (
  product_id INTEGER REFERENCES products(id),
  supplier_id INTEGER REFERENCES suppliers(id),
  cost_price REAL NOT NULL,
  PRIMARY KEY (product_id, supplier_id)
);

CREATE TABLE IF NOT EXISTS customers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  country TEXT,
  joined_at DATE,
  tier TEXT NOT NULL DEFAULT 'bronze',
  loyalty_points INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  status TEXT NOT NULL DEFAULT 'pending',
  created_at DATE
);

CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_price REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  product_id INTEGER REFERENCES products(id),
  rating INTEGER NOT NULL,
  body TEXT,
  created_at DATE
);

-- Categories
INSERT INTO categories VALUES
  (1, 'Electronics', NULL),
  (2, 'Phones',      1),
  (3, 'Laptops',     1),
  (4, 'Audio',       1),
  (5, 'Accessories', 1),
  (6, 'Clothing',    NULL),
  (7, 'Tops',        6),
  (8, 'Bottoms',     6);

-- Suppliers
INSERT INTO suppliers VALUES
  (1, 'TechSource Ltd',    'CN', 'techsource@example.com'),
  (2, 'MobileGlobal Inc',  'KR', 'mobileglobal@example.com'),
  (3, 'LaptopDirect GmbH', 'DE', 'laptopdirect@example.com'),
  (4, 'AudioPrime Co',     'JP', 'audioprime@example.com'),
  (5, 'FabricWorld Ltd',   'IN', 'fabricworld@example.com'),
  (6, 'GadgetHub BV',      'NL', 'gadgethub@example.com');

-- Products (id, name, category_id, price, stock, is_active, weight)
INSERT INTO products VALUES
  (1,  'iPhone 15',           2, 999.99,  50,  1, 0.17),
  (2,  'Samsung Galaxy S24',  2, 799.99,  75,  1, 0.17),
  (3,  'Google Pixel 8',      2, 699.99,  40,  1, 0.19),
  (4,  'MacBook Pro',         3, 1999.99, 30,  1, 2.15),
  (5,  'Dell XPS 15',         3, 1499.99, 25,  1, 1.86),
  (6,  'ThinkPad X1 Carbon',  3, 1299.99, 20,  1, 1.13),
  (7,  'Sony WH-1000XM5',     4, 349.99,  60,  1, 0.25),
  (8,  'AirPods Pro',         4, 249.99,  80,  1, 0.06),
  (9,  'USB-C Hub',           5, 49.99,   150, 1, 0.12),
  (10, 'Phone Case',          5, 14.99,   300, 1, 0.05),
  (11, 'Plain T-Shirt',       7, 19.99,   200, 1, 0.20),
  (12, 'Polo Shirt',          7, 34.99,   120, 1, 0.25),
  (13, 'Jeans',               8, 59.99,   90,  1, 0.60),
  (14, 'Chinos',              8, 49.99,   70,  1, 0.55),
  (15, 'Wireless Charger',    5, 29.99,   100, 0, 0.10);

-- Product–Supplier mappings with cost prices
INSERT INTO product_suppliers VALUES
  (1,  1, 620.00),
  (1,  2, 650.00),
  (2,  2, 480.00),
  (3,  1, 400.00),
  (3,  6, 420.00),
  (4,  3, 1200.00),
  (5,  3, 900.00),
  (5,  6, 950.00),
  (6,  3, 780.00),
  (7,  4, 180.00),
  (8,  1, 130.00),
  (8,  4, 140.00),
  (9,  6, 18.00),
  (10, 1, 4.00),
  (10, 5, 3.50),
  (11, 5, 6.00),
  (12, 5, 10.00),
  (13, 5, 18.00),
  (14, 5, 15.00),
  (15, 6, 12.00);

-- Customers (id, name, email, country, joined_at, tier, loyalty_points)
-- Customer 12 (Liam) intentionally has no orders — useful for LEFT JOIN scenarios
INSERT INTO customers VALUES
  (1,  'Alice Johnson',   'alice@example.com',   'US', '2023-01-15', 'gold',   1500),
  (2,  'Bob Smith',       'bob@example.com',     'UK', '2023-03-22', 'silver', 800),
  (3,  'Carol White',     'carol@example.com',   'CA', '2023-06-10', 'gold',   2100),
  (4,  'David Lee',       'david@example.com',   'AU', '2024-01-05', 'bronze', 200),
  (5,  'Emma Davis',      'emma@example.com',    'US', '2023-02-20', 'silver', 650),
  (6,  'Frank Miller',    'frank@example.com',   'DE', '2023-07-14', 'bronze', 100),
  (7,  'Grace Chen',      'grace@example.com',   'US', '2022-11-30', 'gold',   3200),
  (8,  'Henry Brown',     'henry@example.com',   'UK', '2024-02-10', 'bronze', 50),
  (9,  'Isla Martinez',   'isla@example.com',    'ES', '2023-09-05', 'silver', 720),
  (10, 'James Wilson',    'james@example.com',   'CA', '2023-04-18', 'silver', 450),
  (11, 'Karen Taylor',    'karen@example.com',   'AU', '2022-08-22', 'gold',   1800),
  (12, 'Liam Anderson',   'liam@example.com',    'US', '2024-03-01', 'bronze', 0),
  (13, 'Maria Garcia',    'maria@example.com',   'MX', '2023-11-12', 'silver', 580),
  (14, 'Noah Thomas',     'noah@example.com',    'UK', '2023-05-30', 'bronze', 150),
  (15, 'Olivia Jackson',  'olivia@example.com',  'DE', '2022-06-15', 'gold',   2900);

-- Orders (id, customer_id, status, created_at)
INSERT INTO orders VALUES
  (1,  1,  'delivered', '2024-01-10'),
  (2,  1,  'delivered', '2024-02-15'),
  (3,  2,  'shipped',   '2024-03-01'),
  (4,  3,  'pending',   '2024-03-20'),
  (5,  4,  'delivered', '2024-02-28'),
  (6,  5,  'delivered', '2024-01-20'),
  (7,  5,  'delivered', '2024-03-05'),
  (8,  6,  'cancelled', '2024-02-10'),
  (9,  7,  'delivered', '2023-12-15'),
  (10, 7,  'delivered', '2024-01-25'),
  (11, 7,  'shipped',   '2024-03-18'),
  (12, 8,  'pending',   '2024-03-22'),
  (13, 9,  'delivered', '2024-02-01'),
  (14, 10, 'delivered', '2024-01-08'),
  (15, 10, 'delivered', '2024-02-20'),
  (16, 11, 'delivered', '2023-11-30'),
  (17, 11, 'shipped',   '2024-03-10'),
  (18, 13, 'delivered', '2024-01-15'),
  (19, 13, 'cancelled', '2024-02-25'),
  (20, 14, 'delivered', '2024-01-30'),
  (21, 15, 'delivered', '2023-12-20'),
  (22, 15, 'delivered', '2024-02-08'),
  (23, 3,  'shipped',   '2024-03-15'),
  (24, 1,  'pending',   '2024-03-25'),
  (25, 7,  'delivered', '2024-02-12');

-- Order items (id, order_id, product_id, quantity, unit_price)
INSERT INTO order_items VALUES
  (1,  1,  1,  1, 999.99),
  (2,  1,  10, 1, 14.99),
  (3,  2,  4,  1, 1999.99),
  (4,  3,  2,  1, 799.99),
  (5,  3,  9,  1, 49.99),
  (6,  4,  5,  1, 1499.99),
  (7,  5,  1,  2, 999.99),
  (8,  6,  8,  1, 249.99),
  (9,  6,  11, 2, 19.99),
  (10, 7,  7,  1, 349.99),
  (11, 8,  13, 1, 59.99),
  (12, 8,  12, 1, 34.99),
  (13, 9,  4,  1, 1999.99),
  (14, 9,  9,  2, 49.99),
  (15, 10, 1,  1, 999.99),
  (16, 10, 8,  1, 249.99),
  (17, 11, 6,  1, 1299.99),
  (18, 12, 11, 3, 19.99),
  (19, 12, 10, 2, 14.99),
  (20, 13, 2,  1, 799.99),
  (21, 13, 10, 1, 14.99),
  (22, 14, 7,  1, 349.99),
  (23, 14, 14, 1, 49.99),
  (24, 15, 12, 2, 34.99),
  (25, 16, 4,  1, 1999.99),
  (26, 16, 8,  1, 249.99),
  (27, 17, 1,  1, 999.99),
  (28, 18, 3,  1, 699.99),
  (29, 18, 9,  1, 49.99),
  (30, 19, 13, 1, 59.99),
  (31, 20, 6,  1, 1299.99),
  (32, 20, 10, 1, 14.99),
  (33, 21, 5,  1, 1499.99),
  (34, 21, 9,  1, 49.99),
  (35, 22, 8,  2, 249.99),
  (36, 23, 3,  1, 699.99),
  (37, 23, 11, 1, 19.99),
  (38, 24, 7,  1, 349.99),
  (39, 25, 14, 2, 49.99),
  (40, 25, 11, 1, 19.99);

-- Reviews (id, customer_id, product_id, rating, body, created_at)
INSERT INTO reviews VALUES
  (1,  1,  1,  5, 'Excellent phone, very happy with it.',        '2024-01-20'),
  (2,  1,  4,  5, 'Best laptop I have ever owned.',              '2024-02-25'),
  (3,  1,  7,  4, 'Great for commuting, solid noise cancelling.','2024-03-30'),
  (4,  2,  2,  4, 'Great phone, solid performance.',             '2024-03-10'),
  (5,  2,  9,  3, 'Works fine, nothing special.',                '2024-03-08'),
  (6,  3,  5,  3, 'Good laptop but runs hot under load.',        '2024-04-01'),
  (7,  3,  3,  5, 'Fantastic camera, love this phone.',          '2024-03-20'),
  (8,  4,  1,  5, 'Amazing device, worth every penny.',          '2024-03-05'),
  (9,  4,  10, 2, 'Cheap feeling material, disappointed.',       '2024-03-10'),
  (10, 5,  8,  4, 'Great sound quality and comfortable fit.',    '2024-01-25'),
  (11, 5,  7,  5, 'Best headphones I have ever tried.',          '2024-03-10'),
  (12, 6,  13, 2, 'Poor quality, had to return them.',           '2024-02-15'),
  (13, 6,  12, 1, 'Terrible quality, falling apart already.',    '2024-02-15'),
  (14, 7,  4,  5, 'Incredibly fast, handles everything.',        '2024-01-01'),
  (15, 7,  1,  4, 'Good upgrade from my previous phone.',        '2024-02-01'),
  (16, 7,  8,  5, 'Perfect for travel and long flights.',        '2024-03-25'),
  (17, 7,  6,  4, 'Solid business laptop, great keyboard.',      '2024-03-25'),
  (18, 8,  11, 3, 'OK quality for the price.',                   '2024-03-28'),
  (19, 9,  2,  4, 'Very good phone, happy with it.',             '2024-02-08'),
  (20, 9,  10, 4, 'Fits well and looks nice.',                   '2024-02-10'),
  (21, 10, 7,  5, 'Incredible noise cancellation.',              '2024-01-15'),
  (22, 10, 14, 4, 'Comfortable and stylish.',                    '2024-01-15'),
  (23, 11, 4,  5, 'Flawless performance, highly recommend.',     '2023-12-10'),
  (24, 11, 8,  4, 'Solid product, happy with the purchase.',     '2024-03-15'),
  (25, 12, 11, 4, 'Nice shirt, good value for money.',           '2024-03-05'),
  (26, 13, 3,  4, 'Love the camera quality on this phone.',      '2024-01-20'),
  (27, 14, 6,  3, 'Decent laptop but keyboard could be better.', '2024-02-05'),
  (28, 14, 10, 5, 'Excellent protection, fits perfectly.',       '2024-02-02'),
  (29, 15, 5,  5, 'Beautiful display, very impressed.',          '2024-01-05'),
  (30, 15, 8,  4, 'Good product but a little pricey.',           '2024-02-15');

CREATE TABLE IF NOT EXISTS departments (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT
);

CREATE TABLE IF NOT EXISTS employees (
  id INTEGER PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  department_id INTEGER REFERENCES departments(id),
  manager_id INTEGER REFERENCES employees(id),
  job_title TEXT NOT NULL,
  salary REAL NOT NULL,
  hired_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS payroll (
  id INTEGER PRIMARY KEY,
  employee_id INTEGER REFERENCES employees(id),
  period TEXT NOT NULL,
  gross REAL NOT NULL,
  tax REAL NOT NULL,
  net REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS leave_requests (
  id INTEGER PRIMARY KEY,
  employee_id INTEGER REFERENCES employees(id),
  type TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
);

INSERT INTO departments VALUES
  (1, 'Engineering', 'New York'),
  (2, 'Product', 'San Francisco'),
  (3, 'Sales', 'Chicago'),
  (4, 'HR', 'New York');

INSERT INTO employees VALUES
  (1, 'Alice',   'Chen',    'alice@corp.com',   1, NULL, 'VP Engineering',     120000, '2019-03-01'),
  (2, 'Bob',     'Martin',  'bob@corp.com',     1, 1,    'Senior Engineer',    95000,  '2020-06-15'),
  (3, 'Carol',   'Okafor',  'carol@corp.com',   1, 1,    'Engineer',           80000,  '2022-01-10'),
  (4, 'David',   'Silva',   'david@corp.com',   2, NULL, 'Head of Product',    110000, '2018-11-20'),
  (5, 'Eva',     'Larsson', 'eva@corp.com',     2, 4,    'Product Manager',    90000,  '2021-04-05'),
  (6, 'Frank',   'Nguyen',  'frank@corp.com',   3, NULL, 'Sales Director',     105000, '2017-08-30'),
  (7, 'Grace',   'Kim',     'grace@corp.com',   3, 6,    'Account Executive',  70000,  '2023-02-14'),
  (8, 'Henry',   'Patel',   'henry@corp.com',   4, NULL, 'HR Manager',         85000,  '2020-09-01');

INSERT INTO payroll VALUES
  (1, 2, '2024-03', 95000, 23750, 71250),
  (2, 3, '2024-03', 80000, 20000, 60000),
  (3, 5, '2024-03', 90000, 22500, 67500),
  (4, 7, '2024-03', 70000, 17500, 52500);

INSERT INTO leave_requests VALUES
  (1, 3, 'annual',  '2024-04-01', '2024-04-05', 'approved'),
  (2, 7, 'sick',    '2024-03-20', '2024-03-21', 'approved'),
  (3, 5, 'annual',  '2024-05-10', '2024-05-17', 'pending'),
  (4, 2, 'parental','2024-06-01', '2024-08-31', 'pending');

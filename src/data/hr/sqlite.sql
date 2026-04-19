CREATE TABLE IF NOT EXISTS departments (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS job_grades (
  id INTEGER PRIMARY KEY,
  grade TEXT NOT NULL,
  min_salary REAL NOT NULL,
  max_salary REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS employees (
  id INTEGER PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  department_id INTEGER REFERENCES departments(id),
  manager_id INTEGER REFERENCES employees(id),
  job_grade_id INTEGER REFERENCES job_grades(id),
  salary REAL NOT NULL,
  hired_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  skills TEXT NOT NULL DEFAULT '[]'
);

CREATE TABLE IF NOT EXISTS performance_reviews (
  id INTEGER PRIMARY KEY,
  employee_id INTEGER REFERENCES employees(id),
  reviewer_id INTEGER REFERENCES employees(id),
  period TEXT NOT NULL,
  score INTEGER NOT NULL,
  reviewed_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department_id INTEGER REFERENCES departments(id),
  status TEXT NOT NULL DEFAULT 'planning',
  start_date TEXT NOT NULL,
  end_date TEXT
);

CREATE TABLE IF NOT EXISTS project_assignments (
  employee_id INTEGER REFERENCES employees(id),
  project_id INTEGER REFERENCES projects(id),
  role TEXT NOT NULL,
  hours_allocated INTEGER NOT NULL,
  PRIMARY KEY (employee_id, project_id)
);

CREATE TABLE IF NOT EXISTS leave_requests (
  id INTEGER PRIMARY KEY,
  employee_id INTEGER REFERENCES employees(id),
  type TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
);

-- Departments: dept 5 (Legal) has no employees — for RIGHT JOIN / FULL OUTER JOIN demos
INSERT INTO departments VALUES
  (1, 'Engineering', 'New York'),
  (2, 'Product',     'San Francisco'),
  (3, 'Sales',       'Chicago'),
  (4, 'People',      'New York'),
  (5, 'Legal',       'London');

INSERT INTO job_grades VALUES
  (1, 'L1',  40000,  65000),
  (2, 'L2',  60000,  85000),
  (3, 'L3',  80000, 110000),
  (4, 'L4', 100000, 135000),
  (5, 'L5', 125000, 165000);

-- Employees: 20 across depts 1-4; employee 5 is terminated
-- employees 1-3 have no project assignments (dept heads) — for LEFT JOIN / EXCEPT demos
-- manager hierarchy is 4 levels deep — for recursive CTE demos
INSERT INTO employees VALUES
  (1,  'Sarah',  'Connor',   'sarah@corp.com',  1, NULL, 5, 155000, '2018-03-01', 'active',     '["Python","Go","Kubernetes","SQL"]'),
  (2,  'James',  'Wright',   'james@corp.com',  2, NULL, 5, 148000, '2017-09-15', 'active',     '["Product Strategy","SQL","Roadmapping"]'),
  (3,  'Maria',  'Santos',   'maria@corp.com',  3, NULL, 5, 140000, '2019-01-20', 'active',     '["Sales","CRM","Negotiation"]'),
  (4,  'Rachel', 'Green',    'rachel@corp.com', 4, NULL, 4, 118000, '2019-11-01', 'active',     '["HR","Recruitment","Compliance"]'),
  (5,  'David',  'Kim',      'david@corp.com',  4, 4,    3,  82000, '2021-05-20', 'terminated', '["HR","Training"]'),
  (6,  'Tom',    'Baker',    'tom@corp.com',    1, 1,    4, 122000, '2019-06-01', 'active',     '["Python","Java","SQL","AWS"]'),
  (7,  'Aisha',  'Patel',    'aisha@corp.com',  1, 1,    4, 118000, '2020-02-15', 'active',     '["React","TypeScript","SQL","Node.js"]'),
  (8,  'Chris',  'Lee',      'chris@corp.com',  2, 2,    4, 115000, '2020-08-01', 'active',     '["Product Strategy","SQL","Analytics"]'),
  (9,  'Nina',   'Volkov',   'nina@corp.com',   3, 3,    4, 112000, '2021-01-10', 'active',     '["Sales","CRM","SQL"]'),
  (10, 'Omar',   'Hassan',   'omar@corp.com',   1, 6,    3,  98000, '2021-03-01', 'active',     '["Python","SQL","Machine Learning"]'),
  (11, 'Priya',  'Sharma',   'priya@corp.com',  1, 6,    3,  95000, '2021-07-15', 'active',     '["Go","Kubernetes","SQL"]'),
  (12, 'Felix',  'Wagner',   'felix@corp.com',  1, 7,    3,  92000, '2022-01-10', 'active',     '["React","TypeScript","Node.js"]'),
  (13, 'Lucia',  'Romero',   'lucia@corp.com',  2, 8,    3,  88000, '2022-04-01', 'active',     '["Product Strategy","SQL","UX Research"]'),
  (14, 'Jake',   'Morrison', 'jake@corp.com',   3, 9,    3,  85000, '2022-06-15', 'active',     '["Sales","CRM"]'),
  (15, 'Yuki',   'Tanaka',   'yuki@corp.com',   1, 7,    2,  75000, '2022-09-01', 'active',     '["React","TypeScript","SQL"]'),
  (16, 'Ben',    'Clarke',   'ben@corp.com',    1, 6,    2,  72000, '2023-01-15', 'active',     '["Python","SQL"]'),
  (17, 'Zoe',    'Adams',    'zoe@corp.com',    2, 8,    2,  70000, '2023-03-01', 'active',     '["SQL","Analytics","UX Research"]'),
  (18, 'Sam',    'Rivera',   'sam@corp.com',    3, 9,    2,  68000, '2023-05-10', 'active',     '["Sales","CRM"]'),
  (19, 'Mia',    'Foster',   'mia@corp.com',    4, 4,    2,  65000, '2023-07-01', 'active',     '["HR","Recruitment"]'),
  (20, 'Leo',    'Barnes',   'leo@corp.com',    1, 7,    1,  52000, '2024-01-15', 'active',     '["Python","React"]');

-- Reviews: employees 10-18, 20 are reviewed; 1-9 and 19 are not
INSERT INTO performance_reviews VALUES
  (1,  10, 6,  '2023-H1', 4, '2023-07-10'),
  (2,  11, 6,  '2023-H1', 5, '2023-07-10'),
  (3,  12, 7,  '2023-H1', 3, '2023-07-12'),
  (4,  13, 8,  '2023-H1', 4, '2023-07-15'),
  (5,  14, 9,  '2023-H1', 4, '2023-07-18'),
  (6,  15, 7,  '2023-H1', 3, '2023-07-12'),
  (7,  16, 6,  '2023-H2', 4, '2024-01-08'),
  (8,  10, 6,  '2023-H2', 5, '2024-01-08'),
  (9,  11, 6,  '2023-H2', 4, '2024-01-08'),
  (10, 12, 7,  '2023-H2', 4, '2024-01-10'),
  (11, 13, 8,  '2023-H2', 5, '2024-01-12'),
  (12, 17, 8,  '2023-H2', 3, '2024-01-12'),
  (13, 15, 7,  '2024-H1', 4, '2024-07-05'),
  (14, 20, 7,  '2024-H1', 3, '2024-07-05'),
  (15, 18, 9,  '2024-H1', 4, '2024-07-08');

-- Projects: project 7 has no assignments — for EXCEPT / NOT EXISTS demos
INSERT INTO projects VALUES
  (1, 'API Redesign',       1, 'active',    '2024-01-01', NULL),
  (2, 'Mobile App',         1, 'completed', '2023-06-01', '2024-02-28'),
  (3, 'CRM Migration',      2, 'active',    '2024-02-01', NULL),
  (4, 'Analytics Platform', 2, 'planning',  '2024-05-01', NULL),
  (5, 'Q2 Sales Drive',     3, 'completed', '2024-01-01', '2024-03-31'),
  (6, 'Recruitment Drive',  4, 'active',    '2024-03-01', NULL),
  (7, 'Onboarding Refresh', 4, 'planning',  '2024-06-01', NULL);

-- Assignments: employees 1-3 have none
INSERT INTO project_assignments VALUES
  (6,  1, 'Tech Lead',    40),
  (7,  1, 'Tech Lead',    32),
  (10, 1, 'Engineer',     80),
  (11, 1, 'Engineer',     80),
  (16, 1, 'Engineer',     60),
  (6,  2, 'Tech Lead',    50),
  (12, 2, 'Engineer',    120),
  (15, 2, 'Engineer',    100),
  (20, 2, 'Engineer',     80),
  (8,  3, 'Product Lead', 60),
  (13, 3, 'PM',          100),
  (17, 3, 'PM',           80),
  (10, 3, 'Engineer',     40),
  (8,  4, 'Product Lead', 20),
  (13, 4, 'PM',           30),
  (9,  5, 'Sales Lead',   80),
  (14, 5, 'Sales',       120),
  (18, 5, 'Sales',       100),
  (4,  6, 'HR Lead',      60),
  (19, 6, 'HR',           80);

INSERT INTO leave_requests VALUES
  (1,  3,  'annual',   '2024-04-01', '2024-04-05', 'approved'),
  (2,  12, 'sick',     '2024-03-20', '2024-03-21', 'approved'),
  (3,  13, 'annual',   '2024-05-10', '2024-05-17', 'pending'),
  (4,  16, 'parental', '2024-06-01', '2024-08-31', 'approved'),
  (5,  7,  'annual',   '2024-07-15', '2024-07-26', 'pending'),
  (6,  18, 'sick',     '2024-03-05', '2024-03-06', 'approved'),
  (7,  20, 'annual',   '2024-08-01', '2024-08-09', 'pending'),
  (8,  11, 'annual',   '2024-06-17', '2024-06-21', 'approved'),
  (9,  15, 'sick',     '2024-02-12', '2024-02-12', 'approved'),
  (10, 14, 'unpaid',   '2024-09-01', '2024-09-14', 'pending');

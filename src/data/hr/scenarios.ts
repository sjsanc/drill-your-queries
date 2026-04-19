import type { Scenario } from "@/types/scenario";

export const hrScenarios: Scenario[] = [
    // ── select-basic ────────────────────────────────────────────────────────────
    {
        prompt: "List every employee's first and last name",
        concepts: ["select-basic"],
        expectedSql: "SELECT first_name, last_name FROM employees",
    },
    {
        prompt: "List all distinct locations that departments are based in",
        concepts: ["select-basic"],
        expectedSql: "SELECT DISTINCT location FROM departments",
    },
    {
        prompt: "Show each employee's email aliased as 'contact' and first_name aliased as 'name'",
        concepts: ["select-basic"],
        expectedSql: "SELECT email AS contact, first_name AS name FROM employees",
    },
    {
        prompt: "List all distinct statuses that appear in the employees table",
        concepts: ["select-basic"],
        expectedSql: "SELECT DISTINCT status FROM employees",
    },
    {
        prompt: "Show each project's name aliased as 'project' and status aliased as 'project_status'",
        concepts: ["select-basic"],
        expectedSql: "SELECT name AS project, status AS project_status FROM projects",
    },

    // ── filter-equality ─────────────────────────────────────────────────────────
    {
        prompt: "Show all active employees (first_name, last_name, status)",
        concepts: ["filter-equality"],
        expectedSql: "SELECT first_name, last_name, status FROM employees WHERE status = 'active'",
    },
    {
        prompt: "Show all employees in the Engineering department (department_id = 1) — first_name, last_name, salary",
        concepts: ["filter-equality"],
        expectedSql: "SELECT first_name, last_name, salary FROM employees WHERE department_id = 1",
    },
    {
        prompt: "Show all approved leave requests (id, employee_id, type)",
        concepts: ["filter-equality"],
        expectedSql: "SELECT id, employee_id, type FROM leave_requests WHERE status = 'approved'",
    },
    {
        prompt: "Show all completed projects (id, name, start_date, end_date)",
        concepts: ["filter-equality"],
        expectedSql: "SELECT id, name, start_date, end_date FROM projects WHERE status = 'completed'",
    },
    {
        prompt: "Show all L5 employees (job_grade_id = 5) — first_name, last_name, salary",
        concepts: ["filter-equality"],
        expectedSql: "SELECT first_name, last_name, salary FROM employees WHERE job_grade_id = 5",
    },

    // ── filter-comparison ───────────────────────────────────────────────────────
    {
        prompt: "Show employees earning more than $100,000 (first_name, last_name, salary)",
        concepts: ["filter-comparison"],
        expectedSql: "SELECT first_name, last_name, salary FROM employees WHERE salary > 100000",
    },
    {
        prompt: "Show employees hired before 2020 (first_name, last_name, hired_at)",
        concepts: ["filter-comparison"],
        expectedSql: "SELECT first_name, last_name, hired_at FROM employees WHERE hired_at < '2020-01-01'",
    },
    {
        prompt: "Show performance reviews with a score of 4 or higher (id, employee_id, period, score)",
        concepts: ["filter-comparison"],
        expectedSql: "SELECT id, employee_id, period, score FROM performance_reviews WHERE score >= 4",
    },
    {
        prompt: "Show employees with a salary of $75,000 or less (first_name, last_name, salary)",
        concepts: ["filter-comparison"],
        expectedSql: "SELECT first_name, last_name, salary FROM employees WHERE salary <= 75000",
    },
    {
        prompt: "Show projects started after 2024-01-01 (name, start_date, status)",
        concepts: ["filter-comparison"],
        expectedSql: "SELECT name, start_date, status FROM projects WHERE start_date > '2024-01-01'",
    },

    // ── filter-logical ──────────────────────────────────────────────────────────
    {
        prompt: "Show active employees in the Engineering department (first_name, last_name, status)",
        concepts: ["filter-logical"],
        expectedSql: "SELECT first_name, last_name, status FROM employees WHERE department_id = 1 AND status = 'active'",
    },
    {
        prompt: "Show employees in the Sales or Product department (first_name, last_name, department_id)",
        concepts: ["filter-logical"],
        expectedSql: "SELECT first_name, last_name, department_id FROM employees WHERE department_id = 3 OR department_id = 2",
    },
    {
        prompt: "Show all employees who are not terminated (first_name, last_name, status)",
        concepts: ["filter-logical"],
        expectedSql: "SELECT first_name, last_name, status FROM employees WHERE NOT status = 'terminated'",
    },
    {
        prompt: "Show active employees earning over $90,000 (first_name, last_name, salary, status)",
        concepts: ["filter-logical"],
        expectedSql: "SELECT first_name, last_name, salary, status FROM employees WHERE status = 'active' AND salary > 90000",
    },
    {
        prompt: "Show leave requests that are either approved or pending (id, employee_id, type, status)",
        concepts: ["filter-logical"],
        expectedSql: "SELECT id, employee_id, type, status FROM leave_requests WHERE status = 'approved' OR status = 'pending'",
    },

    // ── filter-null ─────────────────────────────────────────────────────────────
    {
        prompt: "Show top-level employees who have no manager (first_name, last_name)",
        concepts: ["filter-null"],
        expectedSql: "SELECT first_name, last_name FROM employees WHERE manager_id IS NULL",
    },
    {
        prompt: "Show all employees who report to someone — those with a manager (first_name, last_name, manager_id)",
        concepts: ["filter-null"],
        expectedSql: "SELECT first_name, last_name, manager_id FROM employees WHERE manager_id IS NOT NULL",
    },
    {
        prompt: "Show all projects that are still ongoing — those with no end date (name, start_date)",
        concepts: ["filter-null"],
        expectedSql: "SELECT name, start_date FROM projects WHERE end_date IS NULL",
    },

    // ── filter-like ─────────────────────────────────────────────────────────────
    {
        prompt: "Show employees whose last name starts with 'S' (first_name, last_name)",
        concepts: ["filter-like"],
        expectedSql: "SELECT first_name, last_name FROM employees WHERE last_name LIKE 'S%'",
    },
    {
        prompt: "Show all employees with a 'corp.com' email address (first_name, last_name, email)",
        concepts: ["filter-like"],
        expectedSql: "SELECT first_name, last_name, email FROM employees WHERE email LIKE '%@corp.com'",
    },
    {
        prompt: "Show projects whose name contains 'Platform' (id, name, status)",
        concepts: ["filter-like"],
        expectedSql: "SELECT id, name, status FROM projects WHERE name LIKE '%Platform%'",
    },
    {
        prompt: "Show employees whose first name is exactly 4 characters long — use _ wildcards (first_name, last_name)",
        concepts: ["filter-like"],
        expectedSql: "SELECT first_name, last_name FROM employees WHERE first_name LIKE '____'",
    },

    // ── filter-in ───────────────────────────────────────────────────────────────
    {
        prompt: "Show leave requests of type 'annual' or 'sick' (id, employee_id, type, status)",
        concepts: ["filter-in"],
        expectedSql: "SELECT id, employee_id, type, status FROM leave_requests WHERE type IN ('annual', 'sick')",
    },
    {
        prompt: "Show employees in Engineering (1) or Sales (3) departments (first_name, last_name, department_id)",
        concepts: ["filter-in"],
        expectedSql: "SELECT first_name, last_name, department_id FROM employees WHERE department_id IN (1, 3)",
    },
    {
        prompt: "Show projects that are NOT in planning status (id, name, status)",
        concepts: ["filter-in"],
        expectedSql: "SELECT id, name, status FROM projects WHERE status NOT IN ('planning')",
    },
    {
        prompt: "Show senior employees at L4 or L5 grade (job_grade_id 4 or 5) — first_name, last_name, salary",
        concepts: ["filter-in"],
        expectedSql: "SELECT first_name, last_name, salary FROM employees WHERE job_grade_id IN (4, 5)",
    },

    // ── filter-between ──────────────────────────────────────────────────────────
    {
        prompt: "Show employees with a salary between $80,000 and $120,000 inclusive (first_name, last_name, salary)",
        concepts: ["filter-between"],
        expectedSql: "SELECT first_name, last_name, salary FROM employees WHERE salary BETWEEN 80000 AND 120000",
    },
    {
        prompt: "Show leave requests starting in Q1 2024 (between 2024-01-01 and 2024-03-31) — id, employee_id, type, start_date",
        concepts: ["filter-between"],
        expectedSql: "SELECT id, employee_id, type, start_date FROM leave_requests WHERE start_date BETWEEN '2024-01-01' AND '2024-03-31'",
    },
    {
        prompt: "Show employees hired between 2020-01-01 and 2022-12-31 inclusive (first_name, last_name, hired_at)",
        concepts: ["filter-between"],
        expectedSql: "SELECT first_name, last_name, hired_at FROM employees WHERE hired_at BETWEEN '2020-01-01' AND '2022-12-31'",
    },
    {
        prompt: "Show performance reviews with a score between 3 and 4 inclusive (id, employee_id, period, score)",
        concepts: ["filter-between"],
        expectedSql: "SELECT id, employee_id, period, score FROM performance_reviews WHERE score BETWEEN 3 AND 4",
    },

    // ── sort ────────────────────────────────────────────────────────────────────
    {
        prompt: "List all employees ordered by salary descending (first_name, last_name, salary)",
        concepts: ["sort"],
        expectedSql: "SELECT first_name, last_name, salary FROM employees ORDER BY salary DESC",
    },
    {
        prompt: "List employees ordered by hired_at ascending, then last_name ascending (first_name, last_name, hired_at)",
        concepts: ["sort"],
        expectedSql: "SELECT first_name, last_name, hired_at FROM employees ORDER BY hired_at ASC, last_name ASC",
    },
    {
        prompt: "List performance reviews ordered by score descending then reviewed_at ascending (employee_id, period, score, reviewed_at)",
        concepts: ["sort"],
        expectedSql: "SELECT employee_id, period, score, reviewed_at FROM performance_reviews ORDER BY score DESC, reviewed_at ASC",
    },
    {
        prompt: "List projects ordered by status ascending then name ascending (name, status, start_date)",
        concepts: ["sort"],
        expectedSql: "SELECT name, status, start_date FROM projects ORDER BY status ASC, name ASC",
    },
    {
        prompt: "List leave requests ordered by start_date ascending (id, employee_id, type, start_date)",
        concepts: ["sort"],
        expectedSql: "SELECT id, employee_id, type, start_date FROM leave_requests ORDER BY start_date ASC",
    },

    // ── pagination ──────────────────────────────────────────────────────────────
    {
        prompt: "Show the 5 highest-paid employees (first_name, last_name, salary)",
        concepts: ["pagination"],
        expectedSql: "SELECT first_name, last_name, salary FROM employees ORDER BY salary DESC LIMIT 5",
    },
    {
        prompt: "Show the 3rd through 5th most recently hired employees (first_name, last_name, hired_at) — use LIMIT and OFFSET",
        concepts: ["pagination"],
        expectedSql: "SELECT first_name, last_name, hired_at FROM employees ORDER BY hired_at DESC LIMIT 3 OFFSET 2",
    },
    {
        prompt: "Show the 3 most recent leave requests by start_date (id, employee_id, type, start_date)",
        concepts: ["pagination"],
        expectedSql: "SELECT id, employee_id, type, start_date FROM leave_requests ORDER BY start_date DESC LIMIT 3",
    },
    {
        prompt: "Show projects 3 through 5 sorted alphabetically by name — use LIMIT and OFFSET (name, status)",
        concepts: ["pagination"],
        expectedSql: "SELECT name, status FROM projects ORDER BY name ASC LIMIT 3 OFFSET 2",
    },

    // ── aggregate-basic ─────────────────────────────────────────────────────────
    {
        prompt: "Count the total number of employees, aliased as total_employees",
        concepts: ["aggregate-basic"],
        expectedSql: "SELECT COUNT(*) AS total_employees FROM employees",
    },
    {
        prompt: "Find the average salary of active employees, aliased as avg_salary",
        concepts: ["aggregate-basic"],
        expectedSql: "SELECT AVG(salary) AS avg_salary FROM employees WHERE status = 'active'",
    },
    {
        prompt: "Find the highest and lowest salaries across all employees, aliased as max_salary and min_salary",
        concepts: ["aggregate-basic"],
        expectedSql: "SELECT MAX(salary) AS max_salary, MIN(salary) AS min_salary FROM employees",
    },
    {
        prompt: "Find the total hours allocated across all project assignments, aliased as total_hours",
        concepts: ["aggregate-basic"],
        expectedSql: "SELECT SUM(hours_allocated) AS total_hours FROM project_assignments",
    },
    {
        prompt: "Count the total number of performance reviews, aliased as total_reviews",
        concepts: ["aggregate-basic"],
        expectedSql: "SELECT COUNT(*) AS total_reviews FROM performance_reviews",
    },

    // ── aggregate-distinct ──────────────────────────────────────────────────────
    {
        prompt: "Count the number of distinct departments that have at least one employee, aliased as active_departments",
        concepts: ["aggregate-distinct"],
        expectedSql: "SELECT COUNT(DISTINCT department_id) AS active_departments FROM employees",
    },
    {
        prompt: "Count the number of distinct employees assigned to at least one project, aliased as assigned_employees",
        concepts: ["aggregate-distinct"],
        expectedSql: "SELECT COUNT(DISTINCT employee_id) AS assigned_employees FROM project_assignments",
    },
    {
        prompt: "Count how many distinct review periods exist in the performance_reviews table, aliased as period_count",
        concepts: ["aggregate-distinct"],
        expectedSql: "SELECT COUNT(DISTINCT period) AS period_count FROM performance_reviews",
    },

    // ── group-by ────────────────────────────────────────────────────────────────
    {
        prompt: "Count the number of employees in each department (department_id, employee_count)",
        concepts: ["group-by"],
        expectedSql: "SELECT department_id, COUNT(*) AS employee_count FROM employees GROUP BY department_id",
    },
    {
        prompt: "Find the average salary per department (department_id, avg_salary)",
        concepts: ["group-by"],
        expectedSql: "SELECT department_id, AVG(salary) AS avg_salary FROM employees GROUP BY department_id",
    },
    {
        prompt: "Count the number of leave requests per type (type, request_count)",
        concepts: ["group-by"],
        expectedSql: "SELECT type, COUNT(*) AS request_count FROM leave_requests GROUP BY type",
    },
    {
        prompt: "Find the total hours allocated per project (project_id, total_hours)",
        concepts: ["group-by"],
        expectedSql: "SELECT project_id, SUM(hours_allocated) AS total_hours FROM project_assignments GROUP BY project_id",
    },
    {
        prompt: "Find the average review score per period (period, avg_score)",
        concepts: ["group-by"],
        expectedSql: "SELECT period, AVG(score) AS avg_score FROM performance_reviews GROUP BY period",
    },
    {
        prompt: "Count the number of employees per job grade (job_grade_id, employee_count)",
        concepts: ["group-by"],
        expectedSql: "SELECT job_grade_id, COUNT(*) AS employee_count FROM employees GROUP BY job_grade_id",
    },

    // ── having ──────────────────────────────────────────────────────────────────
    {
        prompt: "Show departments with more than 3 employees (department_id, employee_count)",
        concepts: ["having"],
        expectedSql: "SELECT department_id, COUNT(*) AS employee_count FROM employees GROUP BY department_id HAVING COUNT(*) > 3",
    },
    {
        prompt: "Show projects with more than 3 employees assigned (project_id, assigned_count)",
        concepts: ["having"],
        expectedSql: "SELECT project_id, COUNT(*) AS assigned_count FROM project_assignments GROUP BY project_id HAVING COUNT(*) > 3",
    },
    {
        prompt: "Show review periods where the average score is above 3.5 (period, avg_score)",
        concepts: ["having"],
        expectedSql: "SELECT period, AVG(score) AS avg_score FROM performance_reviews GROUP BY period HAVING AVG(score) > 3.5",
    },
    {
        prompt: "Show employees who have more than 1 leave request (employee_id, request_count)",
        concepts: ["having"],
        expectedSql: "SELECT employee_id, COUNT(*) AS request_count FROM leave_requests GROUP BY employee_id HAVING COUNT(*) > 1",
    },

    // ── join-inner ──────────────────────────────────────────────────────────────
    {
        prompt: "Show each employee with their department name (first_name, last_name, department)",
        concepts: ["join-inner"],
        expectedSql: "SELECT e.first_name, e.last_name, d.name AS department FROM employees e JOIN departments d ON e.department_id = d.id",
    },
    {
        prompt: "Show each employee with their job grade label (first_name, last_name, salary, grade)",
        concepts: ["join-inner"],
        expectedSql: "SELECT e.first_name, e.last_name, e.salary, g.grade FROM employees e JOIN job_grades g ON e.job_grade_id = g.id",
    },
    {
        prompt: "Show each project with its department name (project name, department, status)",
        concepts: ["join-inner"],
        expectedSql: "SELECT p.name AS project, d.name AS department, p.status FROM projects p JOIN departments d ON p.department_id = d.id",
    },
    {
        prompt: "Show each performance review with the reviewed employee's first and last name (first_name, last_name, period, score)",
        concepts: ["join-inner"],
        expectedSql: "SELECT e.first_name, e.last_name, r.period, r.score FROM performance_reviews r JOIN employees e ON r.employee_id = e.id",
    },

    // ── join-left ───────────────────────────────────────────────────────────────
    {
        prompt: "Show all employees and how many projects they are assigned to, including those with no assignments (first_name, last_name, project_count)",
        concepts: ["join-left"],
        expectedSql: "SELECT e.first_name, e.last_name, COUNT(pa.project_id) AS project_count FROM employees e LEFT JOIN project_assignments pa ON e.id = pa.employee_id GROUP BY e.id, e.first_name, e.last_name",
    },
    {
        prompt: "Show all departments and their employee count, including departments with no employees (department, employee_count)",
        concepts: ["join-left"],
        expectedSql: "SELECT d.name AS department, COUNT(e.id) AS employee_count FROM departments d LEFT JOIN employees e ON e.department_id = d.id GROUP BY d.id, d.name",
    },
    {
        prompt: "Show all employees and their most recent review score, NULL if they have never been reviewed (first_name, last_name, latest_score)",
        concepts: ["join-left"],
        expectedSql: "SELECT e.first_name, e.last_name, MAX(r.score) AS latest_score FROM employees e LEFT JOIN performance_reviews r ON r.employee_id = e.id GROUP BY e.id, e.first_name, e.last_name",
    },
    {
        prompt: "Show all projects and the total hours allocated, 0 if no one is assigned (project name, total_hours)",
        concepts: ["join-left"],
        expectedSql: "SELECT p.name, COALESCE(SUM(pa.hours_allocated), 0) AS total_hours FROM projects p LEFT JOIN project_assignments pa ON pa.project_id = p.id GROUP BY p.id, p.name",
    },

    // ── join-right ──────────────────────────────────────────────────────────────
    {
        prompt: "Show all departments and any employees in them, including departments with no employees — use RIGHT JOIN with departments on the right (first_name, last_name, department)",
        concepts: ["join-right"],
        expectedSql: "SELECT e.first_name, e.last_name, d.name AS department FROM employees e RIGHT JOIN departments d ON e.department_id = d.id",
    },
    {
        prompt: "Show all projects and any assignments, including projects with no assignments — use RIGHT JOIN with projects on the right (employee_id, role, project)",
        concepts: ["join-right"],
        expectedSql: "SELECT pa.employee_id, pa.role, p.name AS project FROM project_assignments pa RIGHT JOIN projects p ON pa.project_id = p.id",
    },

    // ── join-full-outer ─────────────────────────────────────────────────────────
    {
        prompt: "Show all departments and all projects using a FULL OUTER JOIN on department_id — include departments with no projects (department, project)",
        concepts: ["join-full-outer"],
        expectedSql: "SELECT d.name AS department, p.name AS project FROM departments d FULL OUTER JOIN projects p ON d.id = p.department_id",
    },
    {
        prompt: "Show all employees and all leave requests using a FULL OUTER JOIN — include employees with no leave (first_name, last_name, type, status)",
        concepts: ["join-full-outer"],
        expectedSql: "SELECT e.first_name, e.last_name, lr.type, lr.status FROM employees e FULL OUTER JOIN leave_requests lr ON e.id = lr.employee_id",
    },

    // ── join-cross ──────────────────────────────────────────────────────────────
    {
        prompt: "Show every combination of department and job grade (department, grade)",
        concepts: ["join-cross"],
        expectedSql: "SELECT d.name AS department, g.grade FROM departments d CROSS JOIN job_grades g",
    },
    {
        prompt: "Show every combination of leave type and leave status from the distinct values in leave_requests (type, status)",
        concepts: ["join-cross"],
        expectedSql: "SELECT t.type, s.status FROM (SELECT DISTINCT type FROM leave_requests) t CROSS JOIN (SELECT DISTINCT status FROM leave_requests) s",
    },

    // ── join-self ───────────────────────────────────────────────────────────────
    {
        prompt: "Show each employee alongside their manager's full name (employee, manager)",
        concepts: ["join-self"],
        expectedSql: "SELECT e.first_name || ' ' || e.last_name AS employee, m.first_name || ' ' || m.last_name AS manager FROM employees e JOIN employees m ON e.manager_id = m.id",
    },
    {
        prompt: "Show all pairs of employees who share the same manager — avoid duplicates (employee1, employee2, manager_id)",
        concepts: ["join-self"],
        expectedSql: "SELECT a.first_name || ' ' || a.last_name AS employee1, b.first_name || ' ' || b.last_name AS employee2, a.manager_id FROM employees a JOIN employees b ON a.manager_id = b.manager_id AND a.id < b.id",
    },
    {
        prompt: "Show each manager alongside the number of direct reports they have (manager, direct_reports)",
        concepts: ["join-self"],
        expectedSql: "SELECT m.first_name || ' ' || m.last_name AS manager, COUNT(e.id) AS direct_reports FROM employees m JOIN employees e ON e.manager_id = m.id GROUP BY m.id, m.first_name, m.last_name",
    },

    // ── join-multi ──────────────────────────────────────────────────────────────
    {
        prompt: "Show each employee with their department name and job grade (first_name, last_name, department, grade)",
        concepts: ["join-multi"],
        expectedSql: "SELECT e.first_name, e.last_name, d.name AS department, g.grade FROM employees e JOIN departments d ON e.department_id = d.id JOIN job_grades g ON e.job_grade_id = g.id",
    },
    {
        prompt: "Show each performance review with both the employee name and the reviewer name (employee, reviewer, period, score)",
        concepts: ["join-multi"],
        expectedSql: "SELECT e.first_name || ' ' || e.last_name AS employee, r.first_name || ' ' || r.last_name AS reviewer, pr.period, pr.score FROM performance_reviews pr JOIN employees e ON pr.employee_id = e.id JOIN employees r ON pr.reviewer_id = r.id",
    },
    {
        prompt: "Show each project assignment with the employee name, project name, and role (employee, project, role, hours_allocated)",
        concepts: ["join-multi"],
        expectedSql: "SELECT e.first_name || ' ' || e.last_name AS employee, p.name AS project, pa.role, pa.hours_allocated FROM project_assignments pa JOIN employees e ON pa.employee_id = e.id JOIN projects p ON pa.project_id = p.id",
    },
    {
        prompt: "Show each project with its department name and the total hours allocated (project, department, total_hours)",
        concepts: ["join-multi"],
        expectedSql: "SELECT p.name AS project, d.name AS department, COALESCE(SUM(pa.hours_allocated), 0) AS total_hours FROM projects p JOIN departments d ON p.department_id = d.id LEFT JOIN project_assignments pa ON pa.project_id = p.id GROUP BY p.id, p.name, d.name",
    },

    // ── subquery-scalar ─────────────────────────────────────────────────────────
    {
        prompt: "Show employees earning above the overall average salary (first_name, last_name, salary)",
        concepts: ["subquery-scalar"],
        expectedSql: "SELECT first_name, last_name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees)",
    },
    {
        prompt: "Show the employee(s) with the highest salary (first_name, last_name, salary)",
        concepts: ["subquery-scalar"],
        expectedSql: "SELECT first_name, last_name, salary FROM employees WHERE salary = (SELECT MAX(salary) FROM employees)",
    },
    {
        prompt: "Show each employee's salary alongside the overall company average (first_name, last_name, salary, company_avg)",
        concepts: ["subquery-scalar"],
        expectedSql: "SELECT first_name, last_name, salary, (SELECT AVG(salary) FROM employees) AS company_avg FROM employees",
    },
    {
        prompt: "Show employees hired after the most recently hired person in the People department (department_id = 4) — first_name, last_name, hired_at",
        concepts: ["subquery-scalar"],
        expectedSql: "SELECT first_name, last_name, hired_at FROM employees WHERE hired_at > (SELECT MAX(hired_at) FROM employees WHERE department_id = 4)",
    },

    // ── subquery-in ─────────────────────────────────────────────────────────────
    {
        prompt: "Show employees who are assigned to at least one project (first_name, last_name)",
        concepts: ["subquery-in"],
        expectedSql: "SELECT first_name, last_name FROM employees WHERE id IN (SELECT DISTINCT employee_id FROM project_assignments)",
    },
    {
        prompt: "Show employees who have at least one approved leave request (first_name, last_name)",
        concepts: ["subquery-in"],
        expectedSql: "SELECT first_name, last_name FROM employees WHERE id IN (SELECT DISTINCT employee_id FROM leave_requests WHERE status = 'approved')",
    },
    {
        prompt: "Show employees who have NOT been assigned to any project (first_name, last_name)",
        concepts: ["subquery-in"],
        expectedSql: "SELECT first_name, last_name FROM employees WHERE id NOT IN (SELECT DISTINCT employee_id FROM project_assignments)",
    },
    {
        prompt: "Show projects that have at least one Engineering employee (department_id = 1) assigned — show distinct project ids and names",
        concepts: ["subquery-in"],
        expectedSql: "SELECT DISTINCT p.id, p.name FROM projects p WHERE p.id IN (SELECT pa.project_id FROM project_assignments pa JOIN employees e ON pa.employee_id = e.id WHERE e.department_id = 1)",
    },

    // ── subquery-correlated ─────────────────────────────────────────────────────
    {
        prompt: "Show employees earning above the average salary in their own department (first_name, last_name, department_id, salary)",
        concepts: ["subquery-correlated"],
        expectedSql: "SELECT first_name, last_name, department_id, salary FROM employees e WHERE salary > (SELECT AVG(salary) FROM employees WHERE department_id = e.department_id)",
    },
    {
        prompt: "Show employees who have received more performance reviews than the average number of reviews per reviewed employee (first_name, last_name)",
        concepts: ["subquery-correlated"],
        expectedSql: "SELECT first_name, last_name FROM employees e WHERE (SELECT COUNT(*) FROM performance_reviews WHERE employee_id = e.id) > (SELECT AVG(cnt) FROM (SELECT COUNT(*) AS cnt FROM performance_reviews GROUP BY employee_id) AS t)",
    },
    {
        prompt: "Show employees whose salary exceeds the maximum salary for their job grade's published range (first_name, last_name, salary, job_grade_id)",
        concepts: ["subquery-correlated"],
        expectedSql: "SELECT first_name, last_name, salary, job_grade_id FROM employees e WHERE salary > (SELECT max_salary FROM job_grades WHERE id = e.job_grade_id)",
    },

    // ── subquery-derived ────────────────────────────────────────────────────────
    {
        prompt: "Show departments where the average salary exceeds $90,000 — use a derived table (department_id, avg_salary)",
        concepts: ["subquery-derived"],
        expectedSql: "SELECT department_id, avg_salary FROM (SELECT department_id, AVG(salary) AS avg_salary FROM employees GROUP BY department_id) AS t WHERE avg_salary > 90000",
    },
    {
        prompt: "Show employees whose average review score is 4 or above — use a derived table (employee_id, avg_score)",
        concepts: ["subquery-derived"],
        expectedSql: "SELECT employee_id, avg_score FROM (SELECT employee_id, AVG(score) AS avg_score FROM performance_reviews GROUP BY employee_id) AS t WHERE avg_score >= 4",
    },
    {
        prompt: "Show projects with more than 150 total allocated hours — use a derived table (project_id, total_hours)",
        concepts: ["subquery-derived"],
        expectedSql: "SELECT project_id, total_hours FROM (SELECT project_id, SUM(hours_allocated) AS total_hours FROM project_assignments GROUP BY project_id) AS t WHERE total_hours > 150",
    },

    // ── exists ──────────────────────────────────────────────────────────────────
    {
        prompt: "Show employees who have at least one performance review (first_name, last_name)",
        concepts: ["exists"],
        expectedSql: "SELECT first_name, last_name FROM employees e WHERE EXISTS (SELECT 1 FROM performance_reviews r WHERE r.employee_id = e.id)",
    },
    {
        prompt: "Show employees who have at least one approved leave request (first_name, last_name)",
        concepts: ["exists"],
        expectedSql: "SELECT first_name, last_name FROM employees e WHERE EXISTS (SELECT 1 FROM leave_requests lr WHERE lr.employee_id = e.id AND lr.status = 'approved')",
    },
    {
        prompt: "Show employees who have never received a performance review (first_name, last_name)",
        concepts: ["exists"],
        expectedSql: "SELECT first_name, last_name FROM employees e WHERE NOT EXISTS (SELECT 1 FROM performance_reviews r WHERE r.employee_id = e.id)",
    },
    {
        prompt: "Show projects that have at least one Engineering employee (department_id = 1) assigned (id, name)",
        concepts: ["exists"],
        expectedSql: "SELECT p.id, p.name FROM projects p WHERE EXISTS (SELECT 1 FROM project_assignments pa JOIN employees e ON pa.employee_id = e.id WHERE pa.project_id = p.id AND e.department_id = 1)",
    },

    // ── union ───────────────────────────────────────────────────────────────────
    {
        prompt: "List all unique first names from Engineering combined with all unique first names from Product, deduplicating (first_name)",
        concepts: ["union"],
        expectedSql: "SELECT first_name FROM employees WHERE department_id = 1 UNION SELECT first_name FROM employees WHERE department_id = 2",
    },
    {
        prompt: "List all employee IDs from project_assignments combined with all employee IDs from leave_requests — deduplicated (id)",
        concepts: ["union"],
        expectedSql: "SELECT employee_id AS id FROM project_assignments UNION SELECT employee_id AS id FROM leave_requests",
    },
    {
        prompt: "List all people who appear in performance_reviews as either a reviewee or a reviewer — deduplicated (person_id)",
        concepts: ["union"],
        expectedSql: "SELECT employee_id AS person_id FROM performance_reviews UNION SELECT reviewer_id AS person_id FROM performance_reviews",
    },

    // ── union-all ────────────────────────────────────────────────────────────────
    {
        prompt: "Show all employee IDs from project_assignments combined with all employee IDs from leave_requests, keeping duplicates (id)",
        concepts: ["union-all"],
        expectedSql: "SELECT employee_id AS id FROM project_assignments UNION ALL SELECT employee_id AS id FROM leave_requests",
    },
    {
        prompt: "Show all department IDs from employees combined with all department IDs from projects, keeping duplicates (department_id)",
        concepts: ["union-all"],
        expectedSql: "SELECT department_id FROM employees UNION ALL SELECT department_id FROM projects",
    },

    // ── intersect ────────────────────────────────────────────────────────────────
    {
        prompt: "Show employee IDs that appear in both project_assignments AND leave_requests (employee_id)",
        concepts: ["intersect"],
        expectedSql: "SELECT employee_id FROM project_assignments INTERSECT SELECT employee_id FROM leave_requests",
    },
    {
        prompt: "Show employee IDs who appear as both a reviewee and a reviewer in performance_reviews (employee_id)",
        concepts: ["intersect"],
        expectedSql: "SELECT employee_id FROM performance_reviews INTERSECT SELECT reviewer_id FROM performance_reviews",
    },

    // ── except ───────────────────────────────────────────────────────────────────
    {
        prompt: "Show IDs of active employees who are not assigned to any project — use EXCEPT (id)",
        concepts: ["except"],
        expectedSql: "SELECT id FROM employees WHERE status = 'active' EXCEPT SELECT DISTINCT employee_id FROM project_assignments",
    },
    {
        prompt: "Show project IDs that have no entries in project_assignments — use EXCEPT (id)",
        concepts: ["except"],
        expectedSql: "SELECT id FROM projects EXCEPT SELECT DISTINCT project_id FROM project_assignments",
    },
    {
        prompt: "Show employee IDs who have a leave request but have never been reviewed — use EXCEPT (employee_id)",
        concepts: ["except"],
        expectedSql: "SELECT DISTINCT employee_id FROM leave_requests EXCEPT SELECT DISTINCT employee_id FROM performance_reviews",
    },

    // ── case-simple ──────────────────────────────────────────────────────────────
    {
        prompt: "Show each leave request with a human-readable type label using CASE (annual → 'Vacation', sick → 'Sick Day', parental → 'Parental Leave', unpaid → 'Unpaid') — columns: id, type, type_label",
        concepts: ["case-simple"],
        expectedSql: "SELECT id, type, CASE type WHEN 'annual' THEN 'Vacation' WHEN 'sick' THEN 'Sick Day' WHEN 'parental' THEN 'Parental Leave' WHEN 'unpaid' THEN 'Unpaid' END AS type_label FROM leave_requests",
    },
    {
        prompt: "Show each employee's status with a label using CASE (active → 'Working', terminated → 'Left') — columns: first_name, last_name, status_label",
        concepts: ["case-simple"],
        expectedSql: "SELECT first_name, last_name, CASE status WHEN 'active' THEN 'Working' WHEN 'terminated' THEN 'Left' END AS status_label FROM employees",
    },
    {
        prompt: "Show each job grade with a descriptive level using CASE (L1 → 'Junior', L2 → 'Mid', L3 → 'Senior', L4 → 'Lead', L5 → 'Principal') — columns: grade, level",
        concepts: ["case-simple"],
        expectedSql: "SELECT grade, CASE grade WHEN 'L1' THEN 'Junior' WHEN 'L2' THEN 'Mid' WHEN 'L3' THEN 'Senior' WHEN 'L4' THEN 'Lead' WHEN 'L5' THEN 'Principal' END AS level FROM job_grades",
    },

    // ── case-searched ────────────────────────────────────────────────────────────
    {
        prompt: "Label each employee's salary band using CASE WHEN: under $75k = 'Junior band', $75k–$100k = 'Mid band', $100k–$130k = 'Senior band', over $130k = 'Executive' — columns: first_name, last_name, salary, band",
        concepts: ["case-searched"],
        expectedSql: "SELECT first_name, last_name, salary, CASE WHEN salary < 75000 THEN 'Junior band' WHEN salary <= 100000 THEN 'Mid band' WHEN salary <= 130000 THEN 'Senior band' ELSE 'Executive' END AS band FROM employees",
    },
    {
        prompt: "Label each performance review score using CASE WHEN: 5 = 'Exceptional', 4 = 'Strong', 3 = 'Meets expectations', 2 = 'Below expectations', 1 = 'Poor' — columns: employee_id, period, score, rating",
        concepts: ["case-searched"],
        expectedSql: "SELECT employee_id, period, score, CASE WHEN score = 5 THEN 'Exceptional' WHEN score = 4 THEN 'Strong' WHEN score = 3 THEN 'Meets expectations' WHEN score = 2 THEN 'Below expectations' ELSE 'Poor' END AS rating FROM performance_reviews",
    },
    {
        prompt: "Classify each project using CASE WHEN: completed = 'Done', active = 'In Progress', planning = 'Upcoming' — columns: name, status, phase",
        concepts: ["case-searched"],
        expectedSql: "SELECT name, status, CASE WHEN status = 'completed' THEN 'Done' WHEN status = 'active' THEN 'In Progress' ELSE 'Upcoming' END AS phase FROM projects",
    },
    {
        prompt: "Label employees by hire era using CASE WHEN on hired_at: before 2019 = 'Founding team', 2019–2021 = 'Early growth', after 2021 = 'Scale-up' — columns: first_name, last_name, hired_at, era",
        concepts: ["case-searched"],
        expectedSql: "SELECT first_name, last_name, hired_at, CASE WHEN hired_at < '2019-01-01' THEN 'Founding team' WHEN hired_at <= '2021-12-31' THEN 'Early growth' ELSE 'Scale-up' END AS era FROM employees",
    },

    // ── coalesce ─────────────────────────────────────────────────────────────────
    {
        prompt: "Show each employee's manager_id, replacing NULL with the text 'No manager' (first_name, last_name, reports_to)",
        concepts: ["coalesce"],
        expectedSql: "SELECT first_name, last_name, COALESCE(CAST(manager_id AS TEXT), 'No manager') AS reports_to FROM employees",
    },
    {
        prompt: "Show each project's end_date, replacing NULL with 'Ongoing' (name, end_date)",
        concepts: ["coalesce"],
        expectedSql: "SELECT name, COALESCE(CAST(end_date AS TEXT), 'Ongoing') AS end_date FROM projects",
    },
    {
        prompt: "Show each employee's salary using NULLIF to return NULL for the minimum salary value of 52000 (first_name, last_name, salary)",
        concepts: ["coalesce"],
        expectedSql: "SELECT first_name, last_name, NULLIF(salary, 52000) AS salary FROM employees",
    },

    // ── cast ─────────────────────────────────────────────────────────────────────
    {
        prompt: "Show each employee's salary truncated to an integer using CAST (first_name, last_name, salary_int)",
        concepts: ["cast"],
        expectedSql: "SELECT first_name, last_name, CAST(salary AS INTEGER) AS salary_int FROM employees",
    },
    {
        prompt: "Show each employee's name and hire year as an integer using CAST and SUBSTR (first_name, last_name, hire_year)",
        concepts: ["cast"],
        engines: ["sqlite"],
        expectedSql: "SELECT first_name, last_name, CAST(SUBSTR(hired_at, 1, 4) AS INTEGER) AS hire_year FROM employees",
    },
    {
        prompt: "Show each performance review's score as a TEXT value for display purposes (employee_id, period, score_text)",
        concepts: ["cast"],
        expectedSql: "SELECT employee_id, period, CAST(score AS TEXT) AS score_text FROM performance_reviews",
    },

    // ── string-basic ─────────────────────────────────────────────────────────────
    {
        prompt: "Show all employee names in uppercase (name_upper)",
        concepts: ["string-basic"],
        expectedSql: "SELECT UPPER(first_name || ' ' || last_name) AS name_upper FROM employees",
    },
    {
        prompt: "Show each employee's last name and its character length, ordered by length descending (last_name, name_length)",
        concepts: ["string-basic"],
        expectedSql: "SELECT last_name, LENGTH(last_name) AS name_length FROM employees ORDER BY name_length DESC",
    },
    {
        prompt: "Show all department locations in lowercase (location_lower)",
        concepts: ["string-basic"],
        expectedSql: "SELECT LOWER(location) AS location_lower FROM departments",
    },
    {
        prompt: "Show each employee's email trimmed of any surrounding whitespace, aliased as clean_email (clean_email)",
        concepts: ["string-basic"],
        expectedSql: "SELECT TRIM(email) AS clean_email FROM employees",
    },

    // ── string-concat ─────────────────────────────────────────────────────────────
    {
        prompt: "Format each employee as 'FirstName LastName' using string concatenation, aliased as full_name",
        concepts: ["string-concat"],
        expectedSql: "SELECT first_name || ' ' || last_name AS full_name FROM employees",
    },
    {
        prompt: "Format each employee as 'Last, First' using string concatenation, aliased as formatted_name",
        concepts: ["string-concat"],
        expectedSql: "SELECT last_name || ', ' || first_name AS formatted_name FROM employees",
    },
    {
        prompt: "Format each employee as 'Name <email>' using string concatenation, aliased as contact",
        concepts: ["string-concat"],
        expectedSql: "SELECT first_name || ' ' || last_name || ' <' || email || '>' AS contact FROM employees",
    },

    // ── cte-basic ─────────────────────────────────────────────────────────────────
    {
        prompt: "Use a CTE called avg_salary to find the average employee salary, then list all employees earning above it (first_name, last_name, salary)",
        concepts: ["cte-basic"],
        expectedSql: `WITH avg_salary AS (
  SELECT AVG(salary) AS val FROM employees
)
SELECT first_name, last_name, salary FROM employees, avg_salary WHERE salary > val`,
    },
    {
        prompt: "Use a CTE called project_hours to compute total hours per project, then show projects with more than 150 total hours (project_id, total_hours)",
        concepts: ["cte-basic"],
        expectedSql: `WITH project_hours AS (
  SELECT project_id, SUM(hours_allocated) AS total_hours FROM project_assignments GROUP BY project_id
)
SELECT project_id, total_hours FROM project_hours WHERE total_hours > 150`,
    },
    {
        prompt: "Use a CTE called review_counts to count reviews per employee, then show employees with more than 1 review (employee_id, review_count)",
        concepts: ["cte-basic"],
        expectedSql: `WITH review_counts AS (
  SELECT employee_id, COUNT(*) AS review_count FROM performance_reviews GROUP BY employee_id
)
SELECT employee_id, review_count FROM review_counts WHERE review_count > 1`,
    },
    {
        prompt: "Use a CTE called dept_headcount to count employees per department, then show departments with 4 or more employees (department_id, headcount)",
        concepts: ["cte-basic"],
        expectedSql: `WITH dept_headcount AS (
  SELECT department_id, COUNT(*) AS headcount FROM employees GROUP BY department_id
)
SELECT department_id, headcount FROM dept_headcount WHERE headcount >= 4`,
    },

    // ── cte-multi ─────────────────────────────────────────────────────────────────
    {
        prompt: "Use two CTEs — active_emps (active employees) and dept_avgs (avg salary per dept) — then show departments where active average exceeds $100,000 (department_id, avg_salary)",
        concepts: ["cte-multi"],
        expectedSql: `WITH active_emps AS (
  SELECT department_id, salary FROM employees WHERE status = 'active'
),
dept_avgs AS (
  SELECT department_id, AVG(salary) AS avg_salary FROM active_emps GROUP BY department_id
)
SELECT department_id, avg_salary FROM dept_avgs WHERE avg_salary > 100000`,
    },
    {
        prompt: "Use two CTEs — review_avgs (avg score per employee) and high_performers (avg score >= 4) — then show the names of high performers (first_name, last_name, avg_score)",
        concepts: ["cte-multi"],
        expectedSql: `WITH review_avgs AS (
  SELECT employee_id, AVG(score) AS avg_score FROM performance_reviews GROUP BY employee_id
),
high_performers AS (
  SELECT employee_id, avg_score FROM review_avgs WHERE avg_score >= 4
)
SELECT e.first_name, e.last_name, hp.avg_score FROM high_performers hp JOIN employees e ON hp.employee_id = e.id`,
    },
    {
        prompt: "Use two CTEs — proj_totals (total hours per project) and top_project (project with the most hours) — then show its name and department (name, department_id, total_hours)",
        concepts: ["cte-multi"],
        expectedSql: `WITH proj_totals AS (
  SELECT project_id, SUM(hours_allocated) AS total_hours FROM project_assignments GROUP BY project_id
),
top_project AS (
  SELECT project_id, total_hours FROM proj_totals ORDER BY total_hours DESC LIMIT 1
)
SELECT p.name, p.department_id, tp.total_hours FROM top_project tp JOIN projects p ON tp.project_id = p.id`,
    },

    // ── cte-recursive ─────────────────────────────────────────────────────────────
    {
        prompt: "Use a recursive CTE to build the full reporting path for every employee (e.g. 'Sarah Connor > Tom Baker > Omar Hassan') — columns: id, path",
        concepts: ["cte-recursive"],
        expectedSql: `WITH RECURSIVE org(id, first_name, last_name, manager_id, path) AS (
  SELECT id, first_name, last_name, manager_id, first_name || ' ' || last_name FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.id, e.first_name, e.last_name, e.manager_id, org.path || ' > ' || e.first_name || ' ' || e.last_name
  FROM employees e JOIN org ON e.manager_id = org.id
)
SELECT id, path FROM org ORDER BY id`,
    },
    {
        prompt: "Use a recursive CTE to find all direct and indirect reports under Tom Baker (employee id = 6) — columns: id, first_name, last_name",
        concepts: ["cte-recursive"],
        expectedSql: `WITH RECURSIVE reports(id, first_name, last_name, manager_id) AS (
  SELECT id, first_name, last_name, manager_id FROM employees WHERE manager_id = 6
  UNION ALL
  SELECT e.id, e.first_name, e.last_name, e.manager_id FROM employees e JOIN reports r ON e.manager_id = r.id
)
SELECT id, first_name, last_name FROM reports`,
    },

    // ── window-row-number ─────────────────────────────────────────────────────────
    {
        prompt: "Number employees within each department by salary descending, most senior first (first_name, last_name, department_id, salary, rn)",
        concepts: ["window-row-number"],
        expectedSql: "SELECT first_name, last_name, department_id, salary, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rn FROM employees",
    },
    {
        prompt: "Assign a sequential row number to all employees ordered by hired_at ascending — oldest hire first (first_name, last_name, hired_at, rn)",
        concepts: ["window-row-number"],
        expectedSql: "SELECT first_name, last_name, hired_at, ROW_NUMBER() OVER (ORDER BY hired_at ASC) AS rn FROM employees",
    },
    {
        prompt: "Number performance reviews per employee chronologically (employee_id, reviewed_at, score, review_num)",
        concepts: ["window-row-number"],
        expectedSql: "SELECT employee_id, reviewed_at, score, ROW_NUMBER() OVER (PARTITION BY employee_id ORDER BY reviewed_at ASC) AS review_num FROM performance_reviews",
    },
    {
        prompt: "Number employees within each job grade by salary descending (first_name, last_name, job_grade_id, salary, rn)",
        concepts: ["window-row-number"],
        expectedSql: "SELECT first_name, last_name, job_grade_id, salary, ROW_NUMBER() OVER (PARTITION BY job_grade_id ORDER BY salary DESC) AS rn FROM employees",
    },

    // ── window-rank ───────────────────────────────────────────────────────────────
    {
        prompt: "Rank employees by salary within each department using RANK(), highest first (first_name, last_name, department_id, salary, salary_rank)",
        concepts: ["window-rank"],
        expectedSql: "SELECT first_name, last_name, department_id, salary, RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS salary_rank FROM employees",
    },
    {
        prompt: "Rank all employees by salary overall using RANK() (first_name, last_name, salary, rank)",
        concepts: ["window-rank"],
        expectedSql: "SELECT first_name, last_name, salary, RANK() OVER (ORDER BY salary DESC) AS rank FROM employees",
    },
    {
        prompt: "Assign a DENSE_RANK to employees by salary with no gaps for ties (first_name, last_name, salary, dense_rank)",
        concepts: ["window-rank"],
        expectedSql: "SELECT first_name, last_name, salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank FROM employees",
    },
    {
        prompt: "Rank projects by total allocated hours using RANK() (project_id, total_hours, hours_rank)",
        concepts: ["window-rank"],
        expectedSql: "SELECT project_id, SUM(hours_allocated) AS total_hours, RANK() OVER (ORDER BY SUM(hours_allocated) DESC) AS hours_rank FROM project_assignments GROUP BY project_id",
    },

    // ── window-ntile ──────────────────────────────────────────────────────────────
    {
        prompt: "Divide employees into 4 salary quartiles using NTILE(4), lowest salary first (first_name, last_name, salary, quartile)",
        concepts: ["window-ntile"],
        expectedSql: "SELECT first_name, last_name, salary, NTILE(4) OVER (ORDER BY salary ASC) AS quartile FROM employees",
    },
    {
        prompt: "Divide employees into 3 groups by salary descending using NTILE(3) (first_name, last_name, salary, group_num)",
        concepts: ["window-ntile"],
        expectedSql: "SELECT first_name, last_name, salary, NTILE(3) OVER (ORDER BY salary DESC) AS group_num FROM employees",
    },
    {
        prompt: "Divide leave requests into 2 halves by start_date ascending using NTILE(2) (id, employee_id, start_date, half)",
        concepts: ["window-ntile"],
        expectedSql: "SELECT id, employee_id, start_date, NTILE(2) OVER (ORDER BY start_date ASC) AS half FROM leave_requests",
    },

    // ── window-lag-lead ───────────────────────────────────────────────────────────
    {
        prompt: "Show each employee alongside the hire date of the person hired immediately before them using LAG() (first_name, last_name, hired_at, prev_hire)",
        concepts: ["window-lag-lead"],
        expectedSql: "SELECT first_name, last_name, hired_at, LAG(hired_at) OVER (ORDER BY hired_at ASC) AS prev_hire FROM employees",
    },
    {
        prompt: "Show each employee alongside the hire date of the person hired immediately after them using LEAD() (first_name, last_name, hired_at, next_hire)",
        concepts: ["window-lag-lead"],
        expectedSql: "SELECT first_name, last_name, hired_at, LEAD(hired_at) OVER (ORDER BY hired_at ASC) AS next_hire FROM employees",
    },
    {
        prompt: "Show each performance review alongside the employee's previous review score using LAG() (employee_id, reviewed_at, score, prev_score)",
        concepts: ["window-lag-lead"],
        expectedSql: "SELECT employee_id, reviewed_at, score, LAG(score) OVER (PARTITION BY employee_id ORDER BY reviewed_at ASC) AS prev_score FROM performance_reviews",
    },

    // ── window-running-total ──────────────────────────────────────────────────────
    {
        prompt: "Show each employee's salary alongside a running total of salaries ordered by hired_at ascending (first_name, last_name, salary, running_total)",
        concepts: ["window-running-total"],
        expectedSql: "SELECT first_name, last_name, salary, SUM(salary) OVER (ORDER BY hired_at ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total FROM employees ORDER BY hired_at ASC",
    },
    {
        prompt: "Show a running count of employees hired per department, ordered by hired_at (first_name, department_id, hired_at, running_count)",
        concepts: ["window-running-total"],
        expectedSql: "SELECT first_name, department_id, hired_at, COUNT(*) OVER (PARTITION BY department_id ORDER BY hired_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_count FROM employees",
    },
    {
        prompt: "Show each project assignment with a running total of hours allocated per project, ordered by employee_id (employee_id, project_id, hours_allocated, running_hours)",
        concepts: ["window-running-total"],
        expectedSql: "SELECT employee_id, project_id, hours_allocated, SUM(hours_allocated) OVER (PARTITION BY project_id ORDER BY employee_id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_hours FROM project_assignments",
    },

    // ── window-partition ──────────────────────────────────────────────────────────
    {
        prompt: "Show each employee alongside the average salary in their department (first_name, last_name, department_id, salary, dept_avg)",
        concepts: ["window-partition"],
        expectedSql: "SELECT first_name, last_name, department_id, salary, AVG(salary) OVER (PARTITION BY department_id) AS dept_avg FROM employees",
    },
    {
        prompt: "Show each employee alongside the maximum salary in their job grade (first_name, last_name, job_grade_id, salary, grade_max)",
        concepts: ["window-partition"],
        expectedSql: "SELECT first_name, last_name, job_grade_id, salary, MAX(salary) OVER (PARTITION BY job_grade_id) AS grade_max FROM employees",
    },
    {
        prompt: "Show each performance review alongside the employee's average score across all their reviews (employee_id, period, score, personal_avg)",
        concepts: ["window-partition"],
        expectedSql: "SELECT employee_id, period, score, AVG(score) OVER (PARTITION BY employee_id) AS personal_avg FROM performance_reviews",
    },
    {
        prompt: "Show each project assignment alongside the total hours allocated for that project (employee_id, project_id, hours_allocated, project_total)",
        concepts: ["window-partition"],
        expectedSql: "SELECT employee_id, project_id, hours_allocated, SUM(hours_allocated) OVER (PARTITION BY project_id) AS project_total FROM project_assignments",
    },

    // ── window-frame ──────────────────────────────────────────────────────────────
    {
        prompt: "Show each employee's salary alongside a running total using an explicit ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW frame, ordered by salary (first_name, last_name, salary, running_total)",
        concepts: ["window-frame"],
        expectedSql: "SELECT first_name, last_name, salary, SUM(salary) OVER (ORDER BY salary ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total FROM employees ORDER BY salary ASC",
    },
    {
        prompt: "Show each performance review with a 3-row rolling average score per employee using ROWS BETWEEN 2 PRECEDING AND CURRENT ROW (employee_id, reviewed_at, score, rolling_avg)",
        concepts: ["window-frame"],
        expectedSql: "SELECT employee_id, reviewed_at, score, AVG(score) OVER (PARTITION BY employee_id ORDER BY reviewed_at ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS rolling_avg FROM performance_reviews",
    },
    {
        prompt: "Show each leave request and a rolling count over the preceding 2 rows and current row, ordered by start_date (id, start_date, rolling_count)",
        concepts: ["window-frame"],
        expectedSql: "SELECT id, start_date, COUNT(*) OVER (ORDER BY start_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS rolling_count FROM leave_requests",
    },

    // ── window-first-last ─────────────────────────────────────────────────────────
    {
        prompt: "Show each employee alongside the lowest salary in their department using FIRST_VALUE (first_name, last_name, department_id, salary, dept_min_salary)",
        concepts: ["window-first-last"],
        expectedSql: "SELECT first_name, last_name, department_id, salary, FIRST_VALUE(salary) OVER (PARTITION BY department_id ORDER BY salary ASC) AS dept_min_salary FROM employees",
    },
    {
        prompt: "Show each performance review alongside the employee's very first review score using FIRST_VALUE (employee_id, reviewed_at, score, first_score)",
        concepts: ["window-first-last"],
        expectedSql: "SELECT employee_id, reviewed_at, score, FIRST_VALUE(score) OVER (PARTITION BY employee_id ORDER BY reviewed_at ASC) AS first_score FROM performance_reviews",
    },
    {
        prompt: "Show each employee alongside the most recently hired person in their department using LAST_VALUE with an unbounded frame (first_name, last_name, department_id, hired_at, latest_hire)",
        concepts: ["window-first-last"],
        expectedSql: "SELECT first_name, last_name, department_id, hired_at, LAST_VALUE(hired_at) OVER (PARTITION BY department_id ORDER BY hired_at ASC ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS latest_hire FROM employees",
    },

    // ── sqlite-strftime ───────────────────────────────────────────────────────────
    {
        prompt: "Show each employee's name and the year they were hired using strftime (first_name, last_name, hire_year)",
        concepts: ["sqlite-strftime"],
        engines: ["sqlite"],
        expectedSql: "SELECT first_name, last_name, strftime('%Y', hired_at) AS hire_year FROM employees",
    },
    {
        prompt: "Count the number of employees hired each year using strftime (hire_year, employee_count)",
        concepts: ["sqlite-strftime"],
        engines: ["sqlite"],
        expectedSql: "SELECT strftime('%Y', hired_at) AS hire_year, COUNT(*) AS employee_count FROM employees GROUP BY strftime('%Y', hired_at)",
    },
    {
        prompt: "Show employees hired before 2021 using strftime to extract the year (first_name, last_name, hired_at)",
        concepts: ["sqlite-strftime"],
        engines: ["sqlite"],
        expectedSql: "SELECT first_name, last_name, hired_at FROM employees WHERE strftime('%Y', hired_at) < '2021'",
    },
    {
        prompt: "Count leave requests starting each month using strftime (month, request_count)",
        concepts: ["sqlite-strftime"],
        engines: ["sqlite"],
        expectedSql: "SELECT strftime('%Y-%m', start_date) AS month, COUNT(*) AS request_count FROM leave_requests GROUP BY strftime('%Y-%m', start_date)",
    },

    // ── sqlite-json ───────────────────────────────────────────────────────────────
    {
        prompt: "Build a JSON object for each employee containing their id, first_name, and salary using json_object (employee_json)",
        concepts: ["sqlite-json"],
        engines: ["sqlite"],
        expectedSql: "SELECT json_object('id', id, 'name', first_name, 'salary', salary) AS employee_json FROM employees",
    },
    {
        prompt: "Build a JSON array of all department names using json_group_array (department_names)",
        concepts: ["sqlite-json"],
        engines: ["sqlite"],
        expectedSql: "SELECT json_group_array(name) AS department_names FROM departments",
    },
    {
        prompt: "Build a JSON object per employee with first_name and salary, then extract the salary back out using json_extract — aliased as extracted_salary (extracted_salary)",
        concepts: ["sqlite-json"],
        engines: ["sqlite"],
        expectedSql: "SELECT json_extract(json_object('name', first_name, 'salary', salary), '$.salary') AS extracted_salary FROM employees",
    },

    // ── sqlite-json-col ───────────────────────────────────────────────────────────
    {
        prompt: "List all distinct skills across all employees by unnesting the skills JSON column using json_each (skill)",
        concepts: ["sqlite-json-col"],
        engines: ["sqlite"],
        expectedSql: "SELECT DISTINCT j.value AS skill FROM employees, json_each(skills) AS j ORDER BY skill",
    },
    {
        prompt: "Show employees who have 'SQL' listed in their skills — use json_each with a WHERE filter (first_name, last_name)",
        concepts: ["sqlite-json-col"],
        engines: ["sqlite"],
        expectedSql: "SELECT DISTINCT e.first_name, e.last_name FROM employees e, json_each(e.skills) AS j WHERE j.value = 'SQL'",
    },
    {
        prompt: "Count how many employees have each skill by unnesting the skills column using json_each (skill, employee_count)",
        concepts: ["sqlite-json-col"],
        engines: ["sqlite"],
        expectedSql: "SELECT j.value AS skill, COUNT(*) AS employee_count FROM employees, json_each(skills) AS j GROUP BY j.value ORDER BY employee_count DESC",
    },

    // ── pg-date ───────────────────────────────────────────────────────────────────
    {
        prompt: "Show each employee's name and the year they were hired using EXTRACT (first_name, last_name, hire_year)",
        concepts: ["pg-date"],
        engines: ["pg"],
        expectedSql: "SELECT first_name, last_name, EXTRACT(year FROM hired_at)::INTEGER AS hire_year FROM employees",
    },
    {
        prompt: "Count the number of employees hired each year using DATE_TRUNC to bucket by year (hire_year, employee_count)",
        concepts: ["pg-date"],
        engines: ["pg"],
        expectedSql: "SELECT DATE_TRUNC('year', hired_at) AS hire_year, COUNT(*) AS employee_count FROM employees GROUP BY DATE_TRUNC('year', hired_at) ORDER BY hire_year",
    },
    {
        prompt: "Show employees hired before 2021 using EXTRACT to compare the year (first_name, last_name, hired_at)",
        concepts: ["pg-date"],
        engines: ["pg"],
        expectedSql: "SELECT first_name, last_name, hired_at FROM employees WHERE EXTRACT(year FROM hired_at) < 2021",
    },
    {
        prompt: "Count leave requests starting each month using TO_CHAR (month, request_count)",
        concepts: ["pg-date"],
        engines: ["pg"],
        expectedSql: "SELECT TO_CHAR(start_date, 'YYYY-MM') AS month, COUNT(*) AS request_count FROM leave_requests GROUP BY TO_CHAR(start_date, 'YYYY-MM')",
    },
    {
        prompt: "Show each employee's name and the month number they were hired using EXTRACT (first_name, last_name, hire_month)",
        concepts: ["pg-date"],
        engines: ["pg"],
        expectedSql: "SELECT first_name, last_name, EXTRACT(month FROM hired_at)::INTEGER AS hire_month FROM employees",
    },
    {
        prompt: "Show employees hired in Q1 (months 1–3) of any year using EXTRACT for month filtering (first_name, last_name, hired_at)",
        concepts: ["pg-date"],
        engines: ["pg"],
        expectedSql: "SELECT first_name, last_name, hired_at FROM employees WHERE EXTRACT(month FROM hired_at) BETWEEN 1 AND 3",
    },

    // ── pg-json ───────────────────────────────────────────────────────────────────
    {
        prompt: "Build a JSON object for each employee containing their id, first_name, and salary using json_build_object (employee_json)",
        concepts: ["pg-json"],
        engines: ["pg"],
        expectedSql: "SELECT json_build_object('id', id, 'name', first_name, 'salary', salary) AS employee_json FROM employees",
    },
    {
        prompt: "Build a JSON array of all department names using json_agg (department_names)",
        concepts: ["pg-json"],
        engines: ["pg"],
        expectedSql: "SELECT json_agg(name) AS department_names FROM departments",
    },
    {
        prompt: "For each department, build a JSON array of employee first names using json_agg (department_id, employee_names)",
        concepts: ["pg-json"],
        engines: ["pg"],
        expectedSql: "SELECT department_id, json_agg(first_name ORDER BY first_name) AS employee_names FROM employees GROUP BY department_id",
    },

    // ── pg-jsonb ──────────────────────────────────────────────────────────────────
    {
        prompt: "Find all employees whose skills contain 'SQL' using the JSONB @> containment operator (first_name, last_name)",
        concepts: ["pg-jsonb"],
        engines: ["pg"],
        expectedSql: `SELECT first_name, last_name FROM employees WHERE skills @> '["SQL"]'`,
    },
    {
        prompt: "Find all employees whose skills include 'Python' using the JSONB ? existence operator (first_name, last_name)",
        concepts: ["pg-jsonb"],
        engines: ["pg"],
        expectedSql: "SELECT first_name, last_name FROM employees WHERE skills ? 'Python'",
    },
    {
        prompt: "List all distinct skills across all employees by unnesting the skills JSONB column using jsonb_array_elements_text (skill)",
        concepts: ["pg-jsonb"],
        engines: ["pg"],
        expectedSql: "SELECT DISTINCT jsonb_array_elements_text(skills) AS skill FROM employees ORDER BY skill",
    },
    {
        prompt: "Count how many employees have each skill by unnesting the skills JSONB column (skill, employee_count)",
        concepts: ["pg-jsonb"],
        engines: ["pg"],
        expectedSql: "SELECT skill, COUNT(*) AS employee_count FROM employees, jsonb_array_elements_text(skills) AS skill GROUP BY skill ORDER BY employee_count DESC",
    },
];

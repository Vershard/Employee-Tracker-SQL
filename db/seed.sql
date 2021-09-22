USE employees;

INSERT into department
    (id, name)
VALUES
    (1,"Sales"),
    (2,"Engineering"),
    (3,"Finance"),
    (4,"Legal");

INSERT into role
    (id, title, salary, department_id)
VALUES
    (1,"Sales Lead", 100000, 1),
    (2,"Salesperson", 70000, 1),
    (3,"Lead Engineer", 150000, 2),
    (4,"Software Engineer", 11000, 2),
    (5,"Account Manager", 150000, 3),
    (6,"Accountant", 125000, 3),
    (7,"Lead Lawyer", 250000, 4),
    (8,"Lawyer", 19000, 4);

INSERT into employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (1,"John", "Smith", 4, NULL),
    (2,"Vershard", "Thomas", 7, NULL);

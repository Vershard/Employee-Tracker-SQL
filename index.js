const inquirer = require("inquirer");
//const connection = require("./db/connection");
const db = require("./db");
require("console.table");
const mysql = require("mysql2");


appIntro()

function appIntro() {
    console.log("Welcome to your Employee Management System!")

    mainMenu();
}

function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Employees"
                },
                {
                    name: "View All Employees By Department"
                },
                {
                    name: "Add Employee"
                },
                {
                    name: "Delete Employee"
                },
                {
                    name: "View All Roles"
                },
                {
                    name: "Add Role"
                },
                {
                    name: "Delete Role"
                },
                {
                    name: "View All Departments"
                },
                {
                    name: "Add Department"
                },
                {
                    name: "Delete Department"
                },
                {
                    name: "Quit"
                }
            ]
        }
    ]).then(response => {
        let userChoice = response.choice;

        console.log("user choice", userChoice)
        if (userChoice === "View All Employees") {
            viewEmployees();
        } else if (userChoice === "View All Employees By Department") {
            viewEmpsDepartment();
        } else if (userChoice === "Add Employee") {
            addEmployee();
        } else if (userChoice === "View All Roles") {
            viewAllRoles();
        } else if (userChoice === "Add Role") {
            addRole();
        } else if (userChoice === "View All Deparments") {
            viewAllDepartments();
        } else if (userChoice === "Add Department") {
            addDepartment();
        } else {
            connection.end();
        }
    });
};

function viewEmployees() {
    db.getAllEmps()
        .then(([employees]) => {

            console.table(employees)
        })
        .then(() => mainMenu());
}

function viewEmpsDepartment() {
    db.empsByDepartment()
        .then(([employee]) => {

            console.table(employee);
        })
        .then(() => mainMenu())
}

function addEmployee() {
    inquirer.prompt([
        {
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            name: "last_name",
            message: "What is the employee's last name?"
        }
    ]).then(response => {
        let firstName = reponse.first_name;
        let lastName = response.last_name;

        db.viewAllRoles()
            .then(([rows]) => {
                let roles = rows;

                const roleChoices = roles.map(({ id, title }) => ({
                    name: title,
                    value: id
                }))

                inquirer.prompt({
                    type: "list",
                    name: "roleId",
                    message: "What is the employees role?",
                    choices: roleChoices
                }).then(response => {
                    let roleId = response.roleId;

                    db.viewEmployees()

                    let employee = {
                        role_id: roleId,
                        first_name: firstName,
                        last_name: lastName
                    }

                    db.createEmployee(employee)

                })
            })

    })
    db.viewAllRoles()
        .then(([employee]) => {

            console.table(employee);
        })
        .then(() => mainMenu())
}

function viewAllRoles() {
    db.viewAllRoles()
        .then(([roles]) => {

            console.table(roles);
        })
        .then(() => mainMenu())
}

function addRole() {
    db.empsByDepartment()
        .then(([employee]) => {

            console.table(employee);
        })
        .then(() => mainMenu())
}


function viewAllDepartments() {
    db.findAllDepartment()
        .then(([departments]) => {

            console.table(departments);
        })
        .then(() => mainMenu())
}

function addDepartment() {
    db.empsByDepartment()
        .then(([employee]) => {

            console.table(employee);
        })
        .then(() => mainMenu())
}

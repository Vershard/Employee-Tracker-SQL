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
                    name: "Update Employee Role"
                },
                {
                    name: "View All Roles"
                },
                {
                    name: "Add Role"
                },
                {
                    name: "View All Departments"
                },
                {
                    name: "Add Department"
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
        } else if (userChoice === "Update Employee Role"){
            updateEmployeeRole();
        } else if (userChoice === "View All Roles") {
            viewAllRoles();
        } else if (userChoice === "Add Role") {
            addRole();
        } else if (userChoice === "View All Departments") {
            viewAllDepartments();
        } else if (userChoice === "Add Department") {
            addDepartment();
        } else if (userChoice === "Quit") {
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
    ])
        .then(response => {
            let firstName = response.first_name;
            let lastName = response.last_name;

            db.viewAllRoles()
                .then(([rows]) => {
                    let roles = rows;

                    const roleChoices = roles.map(({ id, title }) => ({
                        name: title,
                        value: id
                    })
                    )
                    console.log("rolechoices", roleChoices)

                    inquirer.prompt({
                        type: "list",
                        name: "roleId",
                        message: "What is the employees role?",
                        choices: roleChoices
                    }).then(response => {
                        let roleId = response.roleId;

                        let employee = {
                            role_id: roleId,
                            first_name: firstName,
                            last_name: lastName
                        }
                        db.createEmployee(employee)
                    })

                        .then(() => {
                            console.log(`Added ${firstName} ${lastName} to the database`)
                        })
                        .then(() => mainMenu())
                })
        })
}

function viewAllRoles() {
    db.viewAllRoles()
        .then(([roles]) => {

            console.table(roles);
        })
        .then(() => mainMenu())
}

function addRole() {
    db.findAllDepartment()
        .then(([rows]) => {
            let departments = rows;
            const departmentChoices = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));

            inquirer.prompt([
                {
                    name: "title",
                    message: "What is the name of the new role?"
                },
                {
                    name: "salary",
                    message: "What is the salary of the role?"
                },
                {
                    type: "list",
                    name: "department_id",
                    message: "Which doepartment does the role fit in?",
                    choices: departmentChoices,
                },

            ])
        .then(role => {
            db.addRole(role)
                .then(() => console.log(`Added ${role.title} to the database.`))
                .then(() => mainMenu())
        })
    })
}

function updateEmployeeRole(){
    db.getAllEmps()
    .then(([rows])=>{
        let employees = rows;
        const employeeChoices = employees.map(({id, first_name, last_name})=>({
            name: `${first_name} ${last_name}`,
            value: id
        }))
        inquirer.prompt([
            {
                type: "list",
                name: "employeeId",
                message: "Which employee's role do you want to update?",
                choices: employeeChoices
            }
        ]).then(response=>{
            let employeeId = response.employeeId;
            db.viewAllRoles()
            .then(([rows])=>{
                let roles = rows;
                const roleChoices = roles.map(({id, title})=>({
                    name: title,
                    value: id
                }));
                inquirer.prompt([
                    {
                        type: "list",
                        name: "roleId",
                        message: "Which role do you want to assign the selected employee?",
                        choices: roleChoices
                    }
                ])
                .then( response => db.updateEmployeeRole(employeeId, response.roleId))
                .then(()=> console.log( "Updated employee's role."))
                .then(()=> mainMenu());
            })
        })
    })
}


function viewAllDepartments() {
    console.log("we got to viewallDerparmts function")
    db.findAllDepartment()
        .then(([departments]) => {

            console.table(departments);
        })
        .then(() => mainMenu())
}

function addDepartment() {
    inquirer.prompt([
        {
            name: "name",
            message: "What is the name of the department?"
        }
    ]).then(response =>{
        let departmentName = response;
        db.addDepartment(departmentName)
        .then(()=> console.log(`Added ${departmentName.name} to the database.`))
        .then(() => mainMenu())
    })
       
}

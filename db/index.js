const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    }


    getAllEmps() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        )
    }

    empsByDepartment() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, department.name FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id;"
        )
    }

    findAllDepartment() {
        return this.connection.promise().query(
           "SELECT department.id, department.name FROM department;"
        )
    }


    viewAllRoles() {
        return this.connection.promise().query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        )

    }

    createEmployee(employee){
        return this.connection.promise().query(
            "INSERT INTO employee SET ?", employee
        )
    }

}



module.exports = new DB(connection);
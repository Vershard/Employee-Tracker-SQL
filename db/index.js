const connection = require("./connection"); 


class DB {
    constructor(connection) {
        this.connection = connection;
    }


    getAllEmps() {
        return this.connection.promise().query(
            "SELECT * FROM employee;"
        )
    }

    empsByDepartment() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, department.name FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id;"
        )
    }

    findAllDepartment() {
        return this.connection.promise().query(
           "SELECT * FROM department;"
        )
    }


    viewAllRoles() {
        return this.connection.promise().query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        )

    }

    createEmployee(employee){
        console.log("DATABASE EMPloyee", employee)
        return this.connection.promise().query(
            "INSERT INTO employee SET ?", employee
        )
    }

    addRole(role){
        return this.connection.promise().query(
            'INSERT INTO role SET ?', role
        )
    }

    addDepartment(department){
        return this.connection.promise().query(
            'INSERT INTO department SET ?', department
        )
    }

    updateEmployeeRole(employeeId, roleId){
        return this.connection.promise().query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
        [roleId, employeeId]
        )
    }
}



module.exports = new DB(connection);
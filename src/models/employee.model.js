'use strict';
var sql = require('../../config/db.config');
const bcrypt = require('bcrypt');
var dbConn = new sql.Request()

var Employee = function (employee) {
    this.first_name = employee.first_name;
    this.last_name = employee.last_name;
    this.email = employee.email;
    this.phone = employee.phone;
    this.organization = employee.organization;
    this.designation = employee.designation;
    this.salary = employee.salary;
    this.status = employee.status ? employee.status : 1;
    this.created_at = new Date();
    this.updated_at = new Date();
    this.password = employee.password;
}

Employee.create = async function (newEmp, result) {
    const request = dbConn;
    request.input('first_name', sql.VarChar, newEmp?.first_name);
    request.input('last_name', sql.VarChar, newEmp?.last_name);
    request.input('email', sql.VarChar, newEmp?.email);
    request.input('phone', sql.VarChar, newEmp?.phone);
    request.input('organization', sql.VarChar, newEmp?.organization);
    request.input('designation', sql.VarChar, newEmp?.designation);
    request.input('salary', sql.VarChar, newEmp?.salary);
    request.input('status', sql.VarChar, newEmp?.status);
    request.input('created_at', sql.Date, newEmp?.created_at);
    request.input('updated_at', sql.Date, newEmp?.created_at);

    //password encrypt
    let encryptedPassword = await bcrypt.hash(newEmp?.password, 10);
    request.input('password', sql.VarChar, encryptedPassword);

    dbConn.output("id", sql.Int).query("INSERT INTO employees(first_name,last_name,email,phone,organization,designation,salary,status,created_at,updated_at,password) Values (@first_name,@last_name,@email,@phone,@organization,@designation,@salary,@status,@created_at,@updated_at,@password)", function (err, res) {
        if (err) {
            console.log(`error: ${err}`)
            result(err, null)
        }
        else {
            console.log(res);
            result(null, res);
        }
    });
};

Employee.findbyId = function (id, result) {
    dbConn.query("SELECT * from employees where id = " + id, function (err, res) {
        if (err) {
            console.log(`error: ${err}`)
            result(err, null)
        }
        else {
            result(null, res?.recordset)
        }
    })
}

Employee.findbyEmail = function (email, password, result) {
    dbConn.query("SELECT * from employees where email = '"+ email +"'", function (err, res) {
        if (err) {
            console.log(`error: ${err}`)
            result(err, null)
        }
        else {
            result(null, res?.recordset)
        }
    })
}




Employee.findAll = function (result) {
    dbConn.query("SELECT * from employees", function (err, res) {
        if (err) {
            console.log(`error: ${err}`)
            result(err, null)
        }
        else {
            result(null, res)
        }
    })
}

Employee.update = function (id, employee, result) {
    dbConn.query("UPDATE employees SET first_name='" + employee.first_name + "', last_name= '" + employee.last_name + "', email='" + employee.email + "', phone='" + employee.phone + "', organization='" + employee.organization + "', designation='" + employee.designation + "', salary='" + employee.salary + "' WHERE id="+id, function (err, res) {
        if (err) {
            console.log(`error: ${err}`)
            result(err, null)
        }
        else {
            result(null, res)
        }
    })
}

Employee.delete = function (id, result) {
    dbConn.query("DELETE FROM employees WHERE id="+ id, function (err, res) {
        if (err) {
            result(err, null)
        }
        else {
            result(null, res)
        }
    })
}


module.exports = Employee;
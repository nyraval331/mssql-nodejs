'use strict';

const Employee = require('../models/employee.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.findAll = function (req, res) {
    Employee.findAll(function (err, employee) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(employee?.recordset)
        }
    })
};

exports.create = function (req, res) {
    const new_employee = new Employee(req.body.employee);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    }
    else {
        Employee.create(new_employee, function (err, employee) {
            if (err) {
                res.send(err)
                console.log(`error: ${err}`)
            }
            else {
                const token = jwt.sign(
                    { user_name: new_employee?.first_name, email: new_employee?.email },
                    'Test',
                    {
                        expiresIn: "2h",
                    }
                );

                res.json({ error: false, message: 'Employee added successfully!', token: token });
            }
        });
    }
};


exports.findById = function (req, res) {
    Employee.findbyId(req.params.id, function (err, employee) {
        if (err) {
            res.send(err)
        }
        else {
            res.json(employee)
        }
    });
};


exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required fields' })
    }
    else {
        Employee.update(req.params.id, new Employee(req.body?.employee), function (err, employee) {
            if (err) {
                res.send(err)
            }
            else {
                res.json({ error: false, message: 'Employee updated successfully' })
            }
        })
    }
}


exports.delete = function (req, res) {
    Employee.delete(req.params.id, function (err, employee) {
        if (err)
            res.send(err);
        res.json({ error: false, message: 'Employee successfully deleted' });
    });
};

exports.register = function (req, res) {
    const new_employee = new Employee(req.body.employee);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    }
    else {
        Employee.create(new_employee, function (err, employee) {
            if (err) {
                res.send(err)
                console.log(`error: ${err}`)
            }
            else {
                const token = jwt.sign(
                    { user_name: new_employee?.first_name, email: new_employee?.email },
                    'Test',
                    {
                        expiresIn: "2h",
                    }
                );
                res.json({ error: false, message: 'Employee added successfully!', token: token });
            }
        });
    }
};

exports.login = function (req, res) {

    // const new_employee = new Employee(req.body.employee);
    const { email, password } = req.body.employee;

    if (!(email && password)) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    }
    else {
        Employee.findbyEmail(email, password, async function (err, employee) {
            if (err) {
                res.send(err)
                console.log(`error: ${err}`)
            }
            else {
            console.log(employee[0]);
                if (employee && employee[0]?.password && (await bcrypt.compare(password, employee[0]?.password))) {
                    // Create token
                    const token = jwt.sign(
                        { user_name: employee[0]?.first_name, email: employee[0]?.email },
                        'Test',
                        {
                            expiresIn: "2h",
                        }
                    );

                    res.json({ error: false, message: 'Employee login successfully!', token: token });
                }
                else{
                    res.status(400).send({ error: false, message: 'Invalid Credentials' });
                }
            }
        });
    }
};

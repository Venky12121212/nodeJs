const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const Employee = require('../modal/Employees')
const {v4: uuidv4} = require('uuid');

let generateId = () => {
    return uuidv4();
}

//GET all the employees
// URL: http://127.0.0.1:5000/api/employees
//Method : GET
router.get('/employees', async (request, response) => {
    try {
        let employees = await Employee.find()
        response.status(200).json(employees);
    } catch (err) {
        console.error(err);
        response.status(500).json({
            msg: 'Server Error'
        })
    }
})

//GET Single employee data
// URL: http://127.0.0.1:5000/api/employees/:id
//Method : GET
router.get('/employees/:id', async (request, response) => {
    let employeeId = request.params.id;
    try {
        let employee = await Employee.findById(employeeId);
        response.status(200).json(employee);
    } catch (err) {
        console.log(err);
        response.status(500).json({
            msg: 'Server Error'
        })
    }
});

// create new employee
// URL: http://127.0.0.1:5000/api/employees/
// method POST
router.post('/employees', async (request, response) => {
    let newEmployee = {
        first_Name: request.body.first_name,
        last_Name: request.body.last_name,
        email: request.body.email,
        gender: request.body.gender,
        ip_address: request.body.ip_address
    }

    try {
        let employee = new Employee(newEmployee);
        await employee.save(); //insert the record
        response.status(200).json({
            msg: "Employee is created"
        })
    } catch (err) {
        response.status(500).json({
            msg: 'Network Error'
        })
    }
})

// update employee
// URL: http://127.0.0.1:5000/api/employees/:id
// method PUT
router.put('/employees/:id', async (request, response) => {
    let employeeId = request.params.id;
    let updateEmployee = {
        first_Name: request.body.first_name,
        last_Name: request.body.last_name,
        email: request.body.email,
        gender: request.body.gender,
        ip_address: request.body.ip_address
    }
    try {
        let employee = await Employee.findById(employeeId)
        if (!employee) {
            return response.status(400).json({
                msg: "No Employee Found"
            })
        }
        await Employee.findByIdAndUpdate(employeeId, {
            $set: updateEmployee
        })

    } catch (err) {
        response.status(500).json({
            msg: "network Error"
        })
    }
})

/*Delete object from array
  URL:- http://127.0.0.1:5000/api/employees/:id
  We have to use delete*/
router.delete('/employees/:id', async (request, response) => {
let employeeId = request.params.id;
try {
    await Employee.findByIdAndDelete(employeeId);
    response.status(200).json({
        msg: "Employee is deleted",
    })
}
catch(err){
    console.error(err);
    response.status(500).json({
        msg: 'Server Error'
    })
}
})

module.exports = router;
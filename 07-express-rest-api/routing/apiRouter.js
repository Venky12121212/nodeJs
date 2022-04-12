const express =  require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

let generateId = () => {
     return uuidv4();
}

//GET all the employees
// URL: http://127.0.0.1:5000/api/employees
//Method : GET
router.get('/employees', (request, response) => {
    fs.readFile(path.join(__dirname, '..', 'data', 'employees.json'), 'utf-8', (err, data) => {
    if(err) throw err.message;
    let employees = JSON.parse(data);
    response.json(employees);
    })
})

//GET Single employee data
// URL: http://127.0.0.1:5000/api/employees/:id
//Method : GET
router.get('/employees/:id', (request, response) => {
    let employeeId = request.params.id;
    fs.readFile(path.join(__dirname, '..', 'data', 'employees.json'), 'utf-8', (err, data) => {
        if(err) throw err;
        let employees = JSON.parse(data);
        let selectedEmployee = employees.find((employee) => {
            return employee.id === employeeId;
        })
       return response.status(200).json(selectedEmployee);
        console.log(selectedEmployee);
    });
});

// create new employee
// URL: http://127.0.0.1:5000/api/employees/
// method POST
router.post('/employees', (request, response) => {
    let newEmployee = {
        id : generateId(),
        firstName : request.body.first_name,
        lastName : request.body.last_name,
        email : request.body.email,
        gender : request.body.gender,
        date : new Date()
    }
    fs.readFile(path.join(__dirname, '..', 'data', 'employees.json'), 'utf-8', (err, data) => {
        if(err) throw err.message;
        let employees = JSON.parse(data);
        employees.unshift(newEmployee); //adds new employee to existing array in first
        fs.writeFile(path.join(__dirname, '..', 'data', 'employees.json'), JSON.stringify(employees), 'utf-8', (err)=>{
            if(err) throw err;
            response.status(200).json({msg: 'New Employee is Created'})
        })
       // response.json(employees);
    })
})

// update employee
// URL: http://127.0.0.1:5000/api/employees/:id
// method PUT
router.put('/ employees/:id', (request, response)=>{
    let employeeId = request.params.id;
    let updateEmployee = {
        id : employeeId,
        firstName : request.body.first_name,
        lastName : request.body.last_name,
        email : request.body.email,
        gender : request.body.gender,
        date : new Date()
    }
    fs.readFile(path.join(__dirname, '..', 'data', 'employees.json'), 'utf-8', (err, data) => {
        if(err) throw err;
        let employees = JSON.parse(data);
        let updateEmployeeIndex = employees.map(employee => employee.id);
        employees.splice(updateEmployeeIndex, 1, updateEmployee); //update an employee existing employee object
        fs.writeFile(path.join(__dirname, '..', 'data', 'employees.json'), JSON.stringify(employees), 'utf-8', (err)=>{
            if(err) throw err;
            response.status(200).json({msg: 'employee successFully updated'})
        })
       // response.status(200).json(removeIndex);
    })
})

/*Delete object from array
  URL:- http://127.0.0.1:5000/api/employees/:id
  We have to use delete*/
router.delete('/employees/:id', (request, response)=> {
    let employeeId = request.params.id;
    fs.readFile(path.join(__dirname, '..', 'data', 'employees.json'), 'utf-8', (err, data) => {
        if (err) throw err;
        let employees = JSON.parse(data);
        let removeIndex = employees.map(employee => employee.id).indexOf(employeeId);
        employees.splice(removeIndex, 1) //remove employee from given index
        fs.writeFile(path.join(__dirname, '..', 'data', 'employees.json'),JSON.stringify(employees), 'utf-8', (err)=> {
            if(err) throw err;
            response.status(200).json({msg: 'employee deleted'})
        })
    })
})

module.exports = router;
const fs = require('fs');

//custom modules
const util = require('./util/utility')
const db = require('./data/dbOperations')

//call custom module
util.greet('Venky');

//call function in nodejs
let reverseData = util.reverseString('data');
console.log(reverseData)

//call db employees
let employeesList =  db.getEmployees();
fs.writeFile('employees.json', JSON.stringify(employeesList) , 'utf-8', (err) => {
    if(err) throw err;
    console.log('file created')
})

fs.readFile('employees.json', 'utf-8', (err, data) => {
    if(err) throw err;
    let EmployeesDataInObjectFormat = JSON.parse(data)
    console.log(EmployeesDataInObjectFormat)
})


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//synchronous code

let password = "Venky@12";
let salt = bcrypt.genSaltSync(10);
let hash = bcrypt.hashSync(password, salt);
console.log(hash);

let isMatch = bcrypt.compareSync('test', hash);
console.log(isMatch);


//json web token
let user = {
    id: 12,
    name: "Venky"
}

let token = jwt.sign(user, 'VVVEEE');
debugger
console.log(token);

//verify token
jwt.verify(token, 'VVVEEE', (err, decoded) => {
    if(err) throw err;
    console.log(decoded)
})

                                                //for server
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');


const hostName = '127.8.8.1';
const port = 5000;

app.listen(port, hostName, () => {
    console.log(`Express JS server started at http://${hostName}:${port}`)
})

// for static filed like .css files
app.use('/public', express.static('public'));

//for json response
app.get('/employees', (reqest, response) => {
    fs.readFile(path.join(__dirname, 'data', 'employees.json'), 'utf-8', (err, data) => {
        if(err) throw err;
        let employees = JSON.parse(data);
        response.json(employees);
    })
})

//for html Tag response
app.get('/', (request, resonse) => {
    resonse.send(`<h2>Welcome to Express JS Server -Updated</h2>`)
});

// for whole html page response
app.get('/home', (request, response) => {   
    response.sendfile(path.join(__dirname, 'index.html'));
})




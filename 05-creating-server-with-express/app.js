const express = require('express'); // load the express module
const app = express(); //initialization
const path = require('path')
const fs = require('fs');


const hostName = '127.5.5.10'
const port = 5000;

app.get('/', (request, response) => {
    response.send(`<h2>Welcome to express server</h2>`);
});

app.listen(port, hostName, () => {
    console.log(`server started at https://${hostName}:${port}`);
});

//configure static files
app.use('/public', express.static('public'));

// for whole html page response
app.get('/home', (request, response) => {
    response.sendfile(path.join(__dirname, 'index.html'));
})

app.get('/download', (request, response) => {
    response.download(path.join(__dirname, 'data', 'venkyLicence.pdf'));
})

//for json response getting
app.get('/employees', (request, response) => {
    fs.readFile(path.join(__dirname, 'data', 'employees.json'), 'utf-8', (err, data) =>{
        if(err) throw err;
        let employees = JSON.parse(data);
        response.json(employees);
    });
});
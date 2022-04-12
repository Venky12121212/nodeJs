const express = require('express');
const app = express();
const path = require('path');
const userRouter = require('./routing/userRouter')

const hostName = '127.2.2.1';
const port = 5000;

//configure the static files
app.use('/public', express.static('public'));

//configure the user router
app.use('/user', userRouter)

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(port, hostName, ()=> {
    console.log(`Server is Started at http://${hostName}:${port}`);
})
const express = require('express');
const app = express();
const cors = require('cors');
const apiRouter = require('./routing/apiRouter')

const hostname = '127.0.0.1'
const port = 5000;

app.use(cors());

app.get('/', (request, response) => {
    response.send(`<h2>Welcome to express server....</h2>`)
});

//configure the json parser for form-data handling
app.use(express.json());
app.use(express.urlencoded({extended: false}))

//configure router
app.use('/api', apiRouter)

app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
})

const express = require('express');
const bodyParser = require('body-parser');

// start an instance of express
const app = express();

// my middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// TODO define routes here


// Let's start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
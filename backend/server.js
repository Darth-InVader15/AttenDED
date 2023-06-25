const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// My routes
const authRoute = require('./routes/auth_routes');

// start an instance of express
const app = express();

// register routes
app.use('/v1/auth', authRoute);


// my middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// TODO define routes here



// Let's start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
require('dotenv').config();

// My routes
const authRoute = require('./routes/auth_routes');

// start an instance of express
const app = express();

// my middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

// register routes
app.use('/v1/auth', authRoute);



// Let's start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
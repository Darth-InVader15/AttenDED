const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const { MongoClient } = require('mongodb');
const mongoose = require("mongoose");
require('dotenv').config();

// My routes
const authRoute = require('./routes/auth_routes');
const subjectItemRoute = require('./routes/subject_item_routes');

// start an instance of express
const app = express();

// MongoClient
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTERNAME}.atdak4m.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('DB CONNECTED');
    console.log("AUTO INCREMENT INITIALIZED")
  })
  .catch((err) => {
    console.error('DB CONNECTION ERROR:', err);
  });

// my middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

// register routes
app.use('/v1/auth', authRoute);
app.use('/v1', subjectItemRoute);



// Let's start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
const express = require('express');  //for accessing express modules.
const bodyParser = require('body-parser'); // for converting the requests and responses into json format.
const { mongoose } = require('./db.js'); //for accessing the database connection

var employeeController = require('./controllers/employeeController')


//Express App and Middleware Setup
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use('/employees', employeeController);

const port = process.env.Port || 4000;
const server = app.listen(port, () => console.log(`Server listening on Port: ${port}... `));

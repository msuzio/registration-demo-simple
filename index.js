'use strict'
const express = require('express');
var bodyParser = require('body-parser');
const app = express();

app.set('port', (process.env.PORT || 5000));

//
// We will want to handle both "simple" POSTs and REST api calls for testing
//
// parse application/x-www-form-urlencoded 
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// parse application/json 
var jsonParser = bodyParser.json();


app.get('/', function (req, res) {
    res.redirect('/register');
});

app.get('/register',  function(req,res) {
    res.status(200).send("On registration page");
});

app.get('/report', function(req,res) {
    res.status(200).send("On report Page");
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

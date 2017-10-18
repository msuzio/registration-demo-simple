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
app.set('view engine', 'ejs');


app.get('/', function (req, res) {
    res.redirect('/register');
});

app.get('/register',  function(req,res) {
    res.render('register');
});

app.post('/register', urlencodedParser, function(req,res) {
    console.log("Posted");
    res.status(200).send("Processing registration" + JSON.stringify(req.params,null,2));
});

app.get('/report', function(req,res) {
    res.render("attendee-list");
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

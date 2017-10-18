'use strict'

// I use "const" throughout just like I use 'final' in Java:
// to avoid shooting myself in the foot.
// By convention, I only uppercase the names of true global constants, 
// generally strings
const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const mongodb = require("mongodb");
const states = require('./util/statelist');
const dateFormat = require('dateformat');

// invert our states mapping; we only want abbreviations in our form, 
// as they're our hash key for vaslidation back
const stateAbbrevs = Object.keys(states);
stateAbbrevs.sort();

const validator = require("./util/validator.js");
const app = express();

// configuration constants; should move to a properties file perhaps?
// page and route data
const REGISTER_TITLE = "Registration";
const REGISTER_PATH = "/register";
const REGISTER_VIEW = "register";
const REGISTER_STYLE = "styles/register.css";

const REPORT_PATH = "/report";
const REPORT_VIEW = "report";
const REPORT_TITLE = "Attendee Report";
const REPORT_STYLE = "styles/report.css";
const CONFIRMATION_PATH = REGISTER_PATH;
const CONFIRMATION_VIEW = "confirmation";
const CONFIRMATION_TITLE = "Registration Confirmation";
const CONFIRMATION_STYLE = "styles/confirmation.css";

// Messages
const VALIDATION_ERROR = "Failed to create new attendee.";
const SAVE_ERROR =  "Error saving new attendee";
const FIND_ERROR = "Failed to get attendee list";

const ATTENDEES_COLLECTION = "attendees";


app.set("port", (process.env.PORT || 5000));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
const mongoUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/myproject"; 


var db;
mongodb.MongoClient.connect(mongoUrl,
    function (err, database) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        // database object is deliberate global so it is usuable 
        // throughout the application and we don"t continuously reconnect.
        // Don"t like it at all; should wrap this in a service module.
        console.log("Database connection ready");
        db = database;
});

// parse application/x-www-form-urlencoded 
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.get("/", function (req, res) {
    res.redirect(REGISTER_PATH);
});

app.get(REGISTER_PATH,  function(req,res) {
    res.render(REGISTER_VIEW, {
        title: REGISTER_TITLE,
        states: stateAbbrevs,
        stylesheet: REGISTER_STYLE
    });
});

// Handle posts to the register URL -- cannot GET against the data, 
// Only post from client-side validation form, and we do 
// server-side validation so, theoretically,
// we should never try to save bad data
app.post(CONFIRMATION_PATH, urlencodedParser, function(req,res) {
    var posted = req.body;  
    console.log(posted);

    var newAttendee = new Attendee(posted);
    var validationErrors = validator.validateAttendee(newAttendee);
    if(Object.keys(validationErrors).length == 0) {
    db.collection(ATTENDEES_COLLECTION).insertOne(newAttendee, function(err, doc) {
        if (err) {
            handleError(res,err.message,SAVE_ERROR);
        } else {
            // success; display confirmation page
            res.render(CONFIRMATION_VIEW, {
                title: CONFIRMATION_TITLE,
                stylesheet: CONFIRMATION_STYLE,
                attendee: doc.ops[0]
            });
        } 
    });
    } else {
        // handleError(res,SAVE_ERROR,VALIDATION_ERROR,validationErrors);
        res.render(REGISTER_VIEW, {
            title: REGISTER_TITLE,
            states: stateAbbrevs,
            stylesheet: REGISTER_STYLE,
            errors: validationErrors
        });
    }
}
);

app.get(REPORT_PATH, function(req,res) {
    db.collection(ATTENDEES_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message,FIND_ERROR);
        } else {
            //
            // sort by reverse date
            //
            docs.sort(compareDates);
            res.render(REPORT_VIEW, {
                title: REPORT_TITLE,
                stylesheet: REPORT_STYLE,
                attendees: docs 
            });
        }
    });
});

const staticDir = __dirname + "/public";
console.log(staticDir);
app.use(express.static(staticDir));

// Not the best handling; informative for testing with curl, though
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    var errData = {"error": message };
    if (code) {
        errData.details = code;
    }
    res.status(500).json(errData);
}

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

//
// wasn't working with 'require', darn it
//
function Attendee (data) {
    this.firstName = data["firstName"];
    this.lastName = data["lastName"];
    this.address = data["address"];
    this.address2 = data["address2"];
    this.city = data["city"];
    this.state = data["state"];
    this.country = data["country"];
    this.zipCode = data["zipCode"];
    var now = new Date();
    this.registerDate = now;
    this.formattedRegisterDate = dateFormat(now,"yyyy-mm-dd HH:MM:ss");
}

function compareDates(a,b) {
    if (a && a["registerDate"]) {
        if (b && b["registerDate"]) {
            if (a == b) {
              return 0;
            } else  {
              return a["registerDate"] < b["registerDate"] ? 1:-1;
            }
        } else {
            // no b -- sort lower
            return 1;
        }
    } else {
        // no a -- sort a lower
        return -1;
    }
};

'use strict'
var states = require('./statelist');
var countries = require('./countrylist');

module.exports = (function() {
    function validateAttendee(data) {
        const errors = {
        };

        if (data) {
            // first name
            // last name
            var nameError = "A first name and last name are required";
            if (!data["firstName"]) {
                errors["firstName"] = nameError;
            }
            if (!data["lastName"]) {
                errors["lastName"] = nameError;
            }

            // address
            if (!data["address"]) {
                errors["address"] = "An address is required";
            }

            // state must be valid
            // var dataState = data["state"];
            // if (!dataState || !states[dataState]) {
            //     errors["state"] = "Must be a valid state";
            // }
            
            // country must be valid
            var dataCountry = data["country"];
            if (!dataCountry || !countries[dataCountry]) {
                errors["country"] = "Must be a valid country";
            }

            // zip must be 1 or two numbers, with a possible dash in there
            var zipError = 'Zip code must be numeric "DDDDD" or "DDDDD-DDDD"';

            var zipCode = data["zipCode"];
            var zipregEx = /^\d{5}(\-\d{4})?$/;
            var zipOK = true;
            if (zipCode) {
                zipOK = zipregEx.test(zipCode);
            } else {
                zipOK = false;
            }
            
            if (!zipOK) {
                errors["zipCode"] = zipError;
            }

    } else {
        errors["INVALID"] = "Empty data cannot be provided";
    }
        return errors;
    }

    function isNotNumeric(input) {
        return isNaN(Number(input));
    }

    return {
        'validateAttendee': validateAttendee
    }
})();
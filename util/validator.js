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
            var zipOK = true;
            if (!zipCode) {
                zipOK = false;
            } else {
                var dashPos = zipCode.indexOf('-');
                if (dashPos > 0) {
                    // split two sections
                    var zip5 = zipCode.substring(0,dashPos);
                    var zip4 = zipCode.substring(dashPos+1);
                    
                    // each must be of the right size and coercable to a number
                    if (zip5.length != 5 || isNotNumeric(zip5) ) {
                        zipOK = false;
                    }
                } else {
                    if (zipCode.length != 5 || isNotNumeric(zip5)) {
                        zipOK = false;
                    }
                }
            }

            if(!zipOK) {
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
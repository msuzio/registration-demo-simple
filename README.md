# registration-demo-simple
A purely server-side implementation of a registration system

# Links
(Register)[https://young-eyrie-86802.herokuapp.com/]
(Attendee Report)[https://young-eyrie-86802.herokuapp.com/report]

# Comments
 * The implementation uses an (Express)[https://expressjs.com/] server with the (HandleBars) [http://handlebarsjs.com/] templating engine, hosted in the cloud with (Heroku)[https://dashboard.heroku.com]
 * Data is persisted to a (Mongo DB)[https://www.mongodb.com/]
 * Pages are styled with (Bootstrap)[https://getbootstrap.com/]
 * client-side validation is pure HTML 5 validation
   * firmly in the *"works for me* territory against these browsers:
     * Microsoft Edge 38
     * Internet Explorer 11
     * Chrome 61
  * Support for older browsers and mobile is lacking
    * Looked at several shims to fill this in for more browsers.
    * Lacking the suite of browsers to teest against, and limited time, did not explore more robust solutions
 * The code is not as modular, nice, or up to ES6 standards as I'd like.
 * CSS isn't quite right; the current development team needs a UI collaborator
   * Layout, while functional, shows gaps. Compromise has been made to pushout the minimum viable product
 

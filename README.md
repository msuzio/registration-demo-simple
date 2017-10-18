# registration-demo-simple
A purely server-side implementation of a registration system

# Links
  * [Register](https://young-eyrie-86802.herokuapp.com/)
  * [Attendee Report](https://young-eyrie-86802.herokuapp.com/report)

# Comments
 * The implementation uses an [Express](https://expressjs.com/) server with the [HandleBars](http://handlebarsjs.com/) templating engine, hosted in the cloud with [Heroku](https://dashboard.heroku.com)
 * Data is persisted to a [Mongo DB](https://www.mongodb.com/)
 * Pages are styled with [Bootstrap](https://getbootstrap.com/)
 * Client-side validation is pure HTML 5 validation
   * Firmly in the *"works for me* territory against these browsers:
     * Microsoft Edge 38
     * Internet Explorer 11
     * Chrome 61
  * Support for older browsers and mobile is lacking
    * Looked at several shims to fill this in for more browsers.
    * Lacking the suite of browsers to test against, and limited time, the developer has not explored more robust solutions or delved into hand-rolled jQuery code.
  * The code is not as modular, nice, or up to ES6 standards as it could be. Babel support needs to be integrated.
  * Formal test cases are lacking (non-existent)
    * Sample valid and invalid POST data templates usable with [Curl](https://curl.haxx.se/) are available in the test/ directory. 
    * Test scripts ran against discrete functions such as the sorting and server-side validation have not been added to the repository.
  * CSS styling isn't quite right; the current development team needs a UI collaborator
   * Layout, while functional, shows gaps. Compromise has been made to pushout the minimum viable product

## Other repositories
See these other partial attempts to use a REST/SPA approach:

  * [Spring Boot API](https://github.com/msuzio/registration-api)
    * Sping framework using Spring Data JPA, Spring MV, and Spring REST extensions)
    * Fully functional set of required create (POST) and retrieve (GET) functionality
    * Abandoned due to issues with database drivers and viable hosting options
  * [Express API + Angular 2 UI](https://github.com/msuzio/registration-demo)
    * ambitious, but over-architected and hard to implement in limited time period
    * Would offer rich UI options difficult to do in current solution
 

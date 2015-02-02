//authentication strategy used by passport, see passport docs for more info on strategies
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var passport = require('passport');
var gcal = require('google-calendar');
//refactor to promises later
var Promise = require('bluebird');
var Firebase = require('firebase');

// Firebase database referance is structured:
//   for each user there is:
//     - swipeData
//     - calendarData
var ref = new Firebase('https://fire-devil.firebaseio.com/');



//auth.js needed for local testing, send email to toleliberman@gmail.com to recieve the file
if(process.env.clientSecret){
  //If the app is deployed, there will be a process.env.clientSecret variable
  //And we'll use the heroku server environment variables
  var auth = {}
  auth['clientID'] = process.env.clientID,
  auth['clientSecret'] = process.env.clientSecret,
  auth['callbackURL'] = process.env.callbackURL

} else {
  //Otherwise we're working with our local version, and a auth.js file is required
  //We can give you the auth.js file with the correct credentials.
  var auth = require('./auth');
}


//serialized a user session,
passport.serializeUser(function(user, done) {
  done(null, user);
});
//used to deserialize user
passport.deserializeUser(function(user, done) {
  done(null, user);
});
//secret access information which allows protects users from CSFR
passport.use(new GoogleStrategy({
  clientID : auth['clientID'],
  clientSecret : auth['clientSecret'],
  callbackURL : auth['callbackURL']
  },
  function(token, refreshToken, profile, done) {
    //instantiate new calendar of logged user
    google_calendar = new gcal.GoogleCalendar(token);
    var currentUser = profile.displayName;
    //makes a new firebase directory for the user

    //google api function to list calendars of user
    google_calendar.calendarList.list(function(err, calendarList) {
      //referance to specific calendar
      var calendarId = calendarList.items[0].id;
      //object where calendarData will be assembled
      var calendarInfo = {};

      calendarInfo.user = currentUser;

      google_calendar.events.list(calendarId, function(err, calendarList) {
        
        //organizes the the data, callback to make sure the data is loaded
        //when the project  is scaled
        var getStableData = function(cb) {
          //'eve' refers to the index number in calendarList.items
          for (var eve in calendarList.items) {
            if (calendarList.items[eve]['summary'] != undefined) {
              (function(eve) {
                calendarInfo[eve] = {};
                var happening = calendarList.items[eve]['summary'];
                calendarInfo[eve]['event'] = happening;
                calendarInfo.happening = happening;
                calendarInfo[eve]['start'] = calendarList.items[eve]['start'];
                calendarInfo[eve]['end'] = calendarList.items[eve]['end'];
                if (calendarList.items[eve]['recurrence']) {
                  calendarInfo[eve]['recurrence'] = calendarList.items[eve]['recurrence']
                }
              })(eve);
            }
          }
          cb();
        };
        getStableData(function() {
          //uploads data to firebase
          var userRef = ref.child(currentUser);
          var calendarRef = userRef.child('calendarData');
          calendarRef.set(calendarInfo);
        });
      });
    });
    
    //at the end of the event loop call the inner callback 
    //http://nodejs.org/api/process.html
    process.nextTick(function() {
      //return profile or false      
      return done(null, profile);
    });
  }
));

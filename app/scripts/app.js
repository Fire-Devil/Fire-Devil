/**
 * @ngdoc overview
 * @name fireDevilApp
 * @description
 * # fireDevilApp
 *
 * Main module of the application.
 */
var fireDevil = angular.module('fireDevilApp', ['firebase'])
  .controller('UserDataCtrl', ['$scope', '$firebase', function($scope, $firebase) {
    var originalUserStorage = {};
    var ref = new Firebase('https://fire-devil.firebaseio.com/');
    var sync = $firebase(ref);
    var record = sync.$asObject();
    var userSwipes = {};

    // Helper function for counting swipes.
    var countStrokes = function(userObj, userName) {
      // Create empty object for each user in userSwipes.
      if (userSwipes[userName] === undefined) {
        userSwipes[userName] = {
          utc: undefined,
          mood: {
            happy: 0,
            excited: 0,
            sad: 0,
            angry: 0
          }
        }
      }
      for (var key in userObj) {
        // console.log('userObj[key]', userObj[key]);
        if (userSwipes['utc'] === undefined) {
          if (typeof userObj[key][2] === 'number') {
            userSwipes[userName]['utc'] = userObj[key][2];
          }
        }
      }
    };

    // Using promises to get user data:
    record.$loaded().
      then(function() {
        for (var key in record) {
          if (key[0] !== '$' && key !== 'forEach') {
            originalUserStorage[key] = record[key];
          }
        }
        $scope.originalUserStorage = originalUserStorage;
      })
      // Using promises to prepare the userSwipes object for population.
      .then(function() {
        for (var key in originalUserStorage) {
          countStrokes(originalUserStorage[key], key);
        }
          console.log('userSwipes', userSwipes);
      });
}]);

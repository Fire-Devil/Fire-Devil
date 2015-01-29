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

    // Using promises:
    record.$loaded().then(function() {
      for (var key in record) {
        if (key[0] !== '$' && key !== 'forEach') {
          originalUserStorage[key] = record[key];
        }
      }
      $scope.originalUserStorage = originalUserStorage;
      console.log(originalUserStorage);
    });
    // record.$loaded().then(function() {
    //   console.log("record:", record);
    // });

    // ref.on('value',
    //   function(snapshot) {
    //     originalUserStorage = snapshot.val();
    //     console.log('originalUserStorage', originalUserStorage);
    //   }, function(error) {
    //   console.log('error', error);
    // });

    // console.log('originalUserStorage', originalUserStorage);
    // $scope.originalUserStorage = originalUserStorage;
  }]);

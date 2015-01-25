var swipesToDB = function(){
  var firebaseRef = new Firebase('https://fire-devil.firebaseio.com/');
  var userRef = firebaseRef.child('userSwipes');
  // localStorage is JSON object with numbered index for each swipe
  // JSON.parse(localStorage[0]) is array with 3, last is date

  // TO DO: local storage has other stuff in it.
  var swipeData = JSON.parse(window.localStorage['swipeData']);
  console.log('swipeData:', swipeData);

  // pushes to db if more than 10 swipes recorded
  if ( Object.keys(swipeData).length > 10 ) {
    for ( var key in swipeData ) {
      userRef.push(swipeData[key]);
    }
    console.log('stuff pushed');
    window.localStorage.swipeData = JSON.stringify({});
    console.log('localStorage.swipeData cleared')
  }
}
swipesToDB();

setInterval(function(){
  swipesToDB();
}, 60000)

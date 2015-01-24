var swipesToDB = function(){
  var firebaseRef = new Firebase('https://fire-devil.firebaseio.com/');
  var userRef = firebaseRef.child('userSwipes');
  // localStorage is JSON object with numbered index for each swipe
  // JSON.parse(localStorage[0]) is array with 3, last is date

  // TO DO: local storage has other stuff in it.
  for ( var i = 0; i < localStorage.length; i++ ) {
    console.log('about to push');
    var swipeData = JSON.parse(window.localStorage[i]);
    console.log('parsed');
    userRef.push({
      swipe1: swipeData[0],
      swipe2: swipeData[1],
      date: swipeData[2]
    });
    console.log('pushed');
  }
}
// swipesToDB();
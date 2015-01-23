var startup = function() {
  var el = document.getElementsByTagName("canvas")[0];
  el.addEventListener("touchstart", handleStart, false);
  el.addEventListener("touchend", handleEnd, false);
  el.addEventListener("touchcancel", handleCancel, false);
  el.addEventListener("touchleave", handleEnd, false);
  el.addEventListener("touchmove", handleMove, false);
  //log("initialized.");

  //Put text on the canvas
  var c = document.getElementById("canvas");
  var ctx = c.getContext("2d");
  ctx.font = "30px Arial";
  ctx.fillText("Happy", 10, 50);
  ctx.fillText("Angry", 500, 550);
  ctx.fillText("Excited", 500, 50);
  ctx.fillText("Sad", 10, 550);
  ctx.fillText("Thumb", 250, 300);
}

var ongoingTouches = [];

//Create storage arrays
var touchesStoreX = [];
var touchesStoreY = [];

//Create a counter for each swipe event
var swipeCount = 0;
var swipeSummary = {};

window.onload = function() {
  startup();
};

var handleStart = function(evt) {
  evt.preventDefault();
  var el = document.getElementsByTagName("canvas")[0];
  var ctx = el.getContext("2d");
  var touches = evt.changedTouches;

  //empty touches storage arrays on start
  touchesStoreX = [];
  touchesStoreY = [];

  for (var i=0; i < touches.length; i++) {
    ongoingTouches.push(copyTouch(touches[i]));
    var color = colorForTouch(touches[i]);
    ctx.beginPath();
    ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0,2*Math.PI, false);  // a circle at the start
    ctx.fillStyle = color;
    ctx.fill();
  }

};

var handleMove = function(evt) {
  evt.preventDefault();
  var el = document.getElementsByTagName("canvas")[0];
  var ctx = el.getContext("2d");
  var touches = evt.changedTouches;

  for (var i=0; i < touches.length; i++) {
    var color = colorForTouch(touches[i]);
    var idx = ongoingTouchIndexById(touches[i].identifier);

    if (idx >= 0) {
      //store touches to array on movement
      touchesStoreX.push(ongoingTouches[idx].pageX);
      touchesStoreY.push(ongoingTouches[idx].pageY);

      ctx.beginPath();
      //log("ctx.moveTo("+ongoingTouches[idx].pageX+", "+ongoingTouches[idx].pageY+");");
      ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
      //log("ctx.lineTo("+touches[i].pageX+", "+touches[i].pageY+");");
      ctx.lineTo(touches[i].pageX, touches[i].pageY);
      ctx.lineWidth = 4;
      ctx.strokeStyle = color;
      ctx.stroke();

      ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
    } else {
      //log("can't figure out which touch to continue");
    }
  }
}

var handleEnd = function(evt) {
  evt.preventDefault();

  var el = document.getElementsByTagName("canvas")[0];
  var ctx = el.getContext("2d");
  var touches = evt.changedTouches;

  for (var i=0; i < touches.length; i++) {
    var color = colorForTouch(touches[i]);
    var idx = ongoingTouchIndexById(touches[i].identifier);

    if (idx >= 0) {
      ctx.lineWidth = 4;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);

      //On end, store the touches arrays on local storage
      //Using swipecount defined globally
      window.localStorage[swipeCount] = JSON.stringify([touchesStoreX, touchesStoreY, moment().format('MMMM Do YYYY, h:mm:ss a')]);
      swipeCount+=1;

      //Print local storage
      ctx.lineTo(touches[i].pageX, touches[i].pageY);
      ctx.fillRect(touches[i].pageX-4, touches[i].pageY-4, 8, 8);  // and a square at the end
      ongoingTouches.splice(idx, 1);  // remove it; we're done
    } else {
      //log("can't figure out which touch to end");
    }
  }
}

var handleCancel = function(evt) {
  evt.preventDefault();
  var touches = evt.changedTouches;

  for (var i=0; i < touches.length; i++) {
    ongoingTouches.splice(i, 1);  // remove it; we're done
  }
}

//TODO: Find out why this doesn't work for Chrome on Android
var colorForTouch = function(touch) {
  var r = touch.identifier % 16;
  var g = Math.floor(touch.identifier / 3) % 16;
  var b = Math.floor(touch.identifier / 7) % 16;
  r = r.toString(16); // make it a hex digit
  g = g.toString(16); // make it a hex digit
  b = b.toString(16); // make it a hex digit
  var color = "#" + r + g + b;
  //log("color for touch with identifier " + touch.identifier + " = " + color);
  return color;
}

var copyTouch = function(touch) {
  return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
}

var ongoingTouchIndexById = function(idToFind) {
  for (var i=0; i < ongoingTouches.length; i++) {
    var id = ongoingTouches[i].identifier;

    //Do we want `===` here?
    if (id == idToFind) {
      return i;
    }
  }
  return -1;    // not found
}

var log = function(msg) {
  var p = document.getElementById('log');
  p.innerHTML = msg + "\n" + p.innerHTML;
}

var printLocalStorage = function() {
  console.dir(window.localStorage);
  log("printing");

  //LOCAL STORAGE IS ALL STRINGS
  //DON'T FORGET TO PARSE!
  for (var keys in window.localStorage) {
    JSON.parse(window.localStorage[keys]);

    var swipe = JSON.parse(window.localStorage[keys])
    var swipeX = swipe[0];
    var swipeY = swipe[1];
    var lenX = swipeX.length;
    var lenY = swipeY.length;

    //dx and dy are the difference between the end and start
    var dx = swipeX[lenX - 1] - swipeX[0];
    var dy = swipeY[lenY - 1] - swipeY[0];
    var slope = dy/dx;

    swipeSummary[keys] = [dx, dy, slope];

    //Did I get closer to the top right corner?
    if (dx > 0 && dy < 0) {
      log("EXCITED :D at " + swipe[2]);
    }

    //Did I get closer to the bottom right corner?
    if (dx > 0 && dy > 0) {
      log("ANGRY >:( at " + swipe[2]);
    }
    //Did I get closer to the top left corner?
    if (dx < 0 && dy < 0) {
      log("HAPPY :) at " + swipe[2]);
    }

    //Did I get closer to the bottom left corner?
    if (dx < 0 && dy > 0) {
      log("SAD :( at " + swipe[2]);
    }
  }

  console.log(swipeSummary[0]);
  console.log(swipeSummary[1]);
  console.log(swipeSummary[2]);
  console.log(swipeSummary[3]);
}

// Place Image Original Height and Width
var width = 10000;
var height = 200;
var formula = width / height;

// Movement in px
// make a negative number to go opposite direction
var movement = 0.1;
// Duration of interval (in milliseconds)
var duration = 1;



var backgroundResize = function() {
   var doc = document.documentElement || document.body;
    var widthForBG = doc.clientHeight * 1.669133771929825;
    document.getElementById("bg").style.backgroundSize = widthForBG + "px auto";
   
  }
  
  //http://stackoverflow.com/questions/641857/javascript-window-resize-event/3150139#3150139
//   Resize on Window Resize
  var windowResize = function(object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    }
  };
  backgroundResize();
  windowResize(window, "resize", backgroundResize);
  var readjust = 0;

// Change setting here if you desire

  setInterval(function () {
    readjust += movement;
    document.getElementById("bg").style.backgroundPosition = readjust + "px 0px"
  }, duration);
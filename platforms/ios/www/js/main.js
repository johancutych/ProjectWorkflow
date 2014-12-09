/* global Hammer */

var running = 0;
var timer = document.getElementById('timer');
var startDate;
var body = document.querySelector('body');

var alreadyCheckedWarmUp = false;
var alreadyCheckedEnd = false;

var sec, min, ms;

var onDeviceReady = function() {
  window.plugin.notification.local.add({
    id: 2,
    title: 'omo',
    message: 'HEJ JOU',
  }, function() {
    alert('Added:');
  });
};

var formatTime = function(time) {
  min = Math.floor((time / 60000) % 60);
  sec = Math.floor((time / 1000) % 60);
  ms = Math.floor((time / 10) % 100) ;

  if (sec < 10) {
    sec = '0' + sec;
  }

  if (min < 10) {
    min = '0' + min;
  }

  return min + ':' + sec;
};

var calculateDiffDate = function() {
  var date = new Date();
  return date - startDate;
};

var checkingTime = function(time) {
  if (time <= 3000000 && !alreadyCheckedWarmUp) {
    alreadyCheckedWarmUp = true;
  } else if ( time <= 0 && !alreadyCheckedEnd) {
    running = 2;
    alreadyCheckedEnd = true;
  }
};

var startBreak = function() {
  document.addEventListener('deviceready', onDeviceReady(), false);
};

var render = function(formated) {
  timer.innerHTML = formated;
};

var tick = function() {
  if (running === 1) {
    var time = 20000 - calculateDiffDate();

    checkingTime(time);

    if (alreadyCheckedEnd === false) {
      var formated = formatTime(time);
      render(formated);
      window.requestAnimationFrame(tick);
    } else {
      alreadyCheckedEnd = false;
      startBreak();
    }
  }
};

var run = function() {
  // TODO(johan): add prefixes
  window.requestAnimationFrame(tick);
};

var startPause = function() {
  if (running === 0) {
    running = 1;
    startDate = new Date();
    run();
  } else if (running === 1) {
    running = 2;
    timer.innerHTML = min + ':' + sec;
  } else if (running === 2) {
    running = 0;
    timer.innerHTML = '60:00';
  }
};

var hammertime = new Hammer.Manager(body);

hammertime.add(new Hammer.Swipe({event: 'swipeShortRight', velocity: 0.1, direction: 4}));
hammertime.add(new Hammer.Swipe({event: 'swipeShortLeft', velocity: 0.1, direction: 2}));

hammertime.on('swipeShortRight', function() {
  startPause();
});

var running = 0;
var timer = document.getElementById('timer');
var test = document.getElementById('test');
var bgProperty = document.querySelector('.clear');
var startDate;

function onDeviceReady () {
window.plugin.notification.local.add({
                                     id: 2,
                                     title: 'omo', //Title
                                     message: 'HEJ JOU', //message
}, function () { //Callback
  alert('Added:');
});
}

var body = document.querySelector('body');
var hammertime = new Hammer.Manager(body);

hammertime.add( new Hammer.Swipe({event: 'swipeShortRight', velocity: 0.1, direction: 4}));
hammertime.add( new Hammer.Swipe({event: 'swipeShortLeft', velocity: 0.1, direction: 2}));
hammertime.on('swipeShortRight', function(ev) {
	startPause();
});


function toggleClass() {
    if (running == 1 || running == 2) {

    }
}

function startPause() {
    if (running == 0) {
        running = 1;
        startDate = new Date();
        run();
    } else if (running == 1) {
        running = 2;
        timer.innerHTML = min + ':' + sec;
    } else if (running == 2) {
        running = 0;
        timer.innerHTML = '60:00';
    }
}

function formatTime(time) {
    min = Math.floor((time / 60000) % 60);
    sec = Math.floor((time / 1000) % 60);
    mil = Math.floor((time / 10) % 100) ;

    if (sec < 10) {
        sec = '0' + sec;
    }

    if (min < 10) {
        min = '0' + min;
    }

    return min + ':' + sec;
}

function calculateDiffDate() {
    var date = new Date();
    return date - startDate;
}

function tick() {
    if (running == 1) {
        var time = 0020000 - calculateDiffDate();

        checkingTime(time);

        if (alreadyCheckedEnd == false) {
            var formated = formatTime(time);
            render(formated);
            window.requestAnimationFrame(tick);
        } else {
            alreadyCheckedEnd = false;
            startBreak();
        }
    }
};

var alreadyCheckedWarmUp = false;
var alreadyCheckedEnd = false;
function checkingTime(time) {
    if (time <= 3000000 && !alreadyCheckedWarmUp) {
        alreadyCheckedWarmUp = true;
    } else if ( time <= 0 && !alreadyCheckedEnd) {
        running = 2;
        alreadyCheckedEnd = true;
    }
}

function render(formated) {
    timer.innerHTML = formated;
}

function run() {
    //TODO(johan): add prefixes
    window.requestAnimationFrame(tick);
}

function changeColor(originalValue, newValue, position) {
    return originalValue + (newValue - originalValue) * position;
}

function startBreak() {
document.addEventListener('deviceready', onDeviceReady(), false);
}

var mv = document.getElementById("vid");
var isViewer = false;
var isPlayBack = false;

var fullDuration;
var halfDuration;
var currentTime;
var playTime;

let self = this;

window.onload = function (e) {
    console.log("document.onload");
    fullDuration = mv.duration;
    halfDuration = mv.duration/2;
    console.log("full duration: " + fullDuration);
    console.log("half duration: " + halfDuration);
    
    mv.addEventListener('play', function() {
        console.log("play event");
        self.timerCallback();
    }, false);
    
    mv.addEventListener('ended', function() {
        console.log("ended");
        isPlayBack = false;
        mv.play();
    }, false);
    
    mv.play();
}

document.addEventListener('keydown', (event) => {
    console.log("Key code: " + event.keyCode);
    
    switch (event.keyCode) {
        case 49 :
            isViewer = true;
            break;
        case 50 :
            isViewer = false;
//            idle();
            gone();
            break;
        case 80 :
            isViewer = false;
            isPlayBack = false;
            mv.currentTime = 0;
            mv.play();
            break;
        case 70 :
            if (mv.requestFullscreen) {
              mv.requestFullscreen();
            } else if (mv.mozRequestFullScreen) {
              mv.mozRequestFullScreen();
            } else if (mv.webkitRequestFullscreen) {
              mv.webkitRequestFullscreen();
            } else if (mv.msRequestFullscreen) { 
              mv.msRequestFullscreen();
            }
            break;
    }
    self.timerCallback();
//    console.log(mv.currentTime);
})

function idle() {
    isPlayBack = !isPlayBack;
    currentTime = fullDuration - mv.currentTime;
    mv.currentTime = currentTime;
}

function gone() {
    isPlayBack = !isPlayBack;
    if (mv.currentTime >= halfDuration) {
        mv.currentTime = mv.currentTime;
    } else {
        currentTime = fullDuration - mv.currentTime;
        mv.currentTime = currentTime;
    }
    
}

function timerCallback() {
    if (mv.paused || mv.ended) {
        return;
    }
    
    currentTime = mv.currentTime;
    
    if (!isViewer && !isPlayBack && currentTime > 1.0) idle();
    if (isViewer && !isPlayBack && currentTime > halfDuration + 1.0) idle();
    if (isViewer && isPlayBack && currentTime > halfDuration - 1.0) isPlayBack = false;
    
//    console.log("timerCallback");
    setTimeout(function () {
        self.timerCallback();
    }, 0);
}
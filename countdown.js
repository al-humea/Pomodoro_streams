const secondsInaMinute = 60;
const minutes_10 = secondsInaMinute * 10;
const minutes_50 = secondsInaMinute * 50;
const seconds_10 = 10; //for testing

let interval;
let isPaused = true;
let countdownWasStarted = false;
let pomodoroDuration = minutes_50; //by default
let timeLeftInSeconds = 0;			
// Button Handlers
function updateDuration() {
//The pomodoro duration is by default 50, but we can change to 25!
	if (timeLeftInSeconds > 0)
		stopCountdown();
	buttons = document.getElementsByTagName("button");
	bg = document.getElementsByClassName("container");
	logo = document.getElementById("logo");
	let color;
	if(pomodoroDuration == minutes_50 ) {
		pomodoroDuration = minutes_10;
		logo.src = "./chill.png";
		color = "#77DD77"
	} else {
		pomodoroDuration = minutes_50;
		logo.src = "./brain.png";
		color = "#77B5FE"
	}
	for(var i = 0; i < buttons.length; i++)
		buttons[i].style.backgroundColor = color;
	for(var i = 0; i < bg.length; i++)
		bg[i].style.backgroundColor = color;
	resetCountdown();
	timeLeftInSeconds = pomodoroDuration
	updateTimeString()
}
function playPauseCountdown() {
	isPaused = !isPaused
	updatePlayPauseButton();
	if(!countdownWasStarted) {
		//This function could be called after initiating the timer,
		//so we need to differentiate when its start vs pause vs resume
		resetCountdown()
		updateTimeString()
	}
	countdownWasStarted = true
	if(isPaused)
		stopCountdown();
	else
		interval = setInterval(updateCountdown, 1000);
}

function restartCountdown() {
	//When we reset the countdown, stop the interval and reset things back to normal
	stopCountdown()
	resetCountdown()
	isPaused = true
	updatePlayPauseButton()
	updateTimeString()
}
// Biz Logic
function updateCountdown() {
	if(isPaused)
		return;
	timeLeftInSeconds--;
	updateTimeString();
	if(timeLeftInSeconds == 0) {
		playSound()
		updateDuration()
	}
}
function pauseCountdown() {
	isPaused = !isPaused;
}
function stopCountdown() {
	clearInterval(interval)
}
function resetCountdown() {
	isPaused = false
	timeLeftInSeconds = pomodoroDuration
}
// View Updates
function updatePlayPauseButton() {
	let playPauseImageSrc;
	if(isPaused)
		playPauseImageSrc = "playButton4x.png";
	else
		playPauseImageSrc = "pauseButton4x.png";
	document.getElementById("playPause").src = playPauseImageSrc;
}
function updateTimeString() {
	let minutes = Math.floor(timeLeftInSeconds / secondsInaMinute);
	let seconds = timeLeftInSeconds % secondsInaMinute;
	if(seconds < 10)
		secondsString = "0" + seconds;
	else
		secondsString = seconds;
	// Output the result in an element with id="demo"
	document.getElementById("countdown").innerHTML = minutes + ":" + secondsString;
}

function playSound() {
	if (pomodoroDuration == minutes_50)
		var audio = document.getElementById("done");
	else
		var audio = document.getElementById("start");
	audio.play();
	document.getElementById("countdown").innerHTML = ":)";
}
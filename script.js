let startTime;
let elapsedTime = 0;
let timerInterval;

const display = document.getElementById('display');
const startPauseButton = document.getElementById('startPause');
const lapButton = document.getElementById('lap');
const resetButton = document.getElementById('reset');
const lapsContainer = document.getElementById('laps');

function formatTime(time) {
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let milliseconds = time % 1000;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

function startPauseTimer() {
    if (!startTime) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        startPauseButton.textContent = 'Pause';
    } else {
        clearInterval(timerInterval);
        startTime = null;
        startPauseButton.textContent = 'Resume';
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function resetTimer() {
    clearInterval(timerInterval);
    startTime = null;
    elapsedTime = 0;
    display.textContent = formatTime(elapsedTime);
    startPauseButton.textContent = 'Start';
    lapsContainer.innerHTML = '';
}

function recordLapTime() {
    if (startTime) {
        const lapTime = elapsedTime;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapsContainer.children.length + 1}: ${formatTime(lapTime)}`;
        lapsContainer.prepend(lapItem);
    }
}

startPauseButton.addEventListener('click', startPauseTimer);
lapButton.addEventListener('click', recordLapTime);
resetButton.addEventListener('click', resetTimer);

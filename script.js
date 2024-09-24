let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

const timeDisplay = document.getElementById('time-display');
const startPauseBtn = document.getElementById('start-pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsList = document.getElementById('laps-list');

startPauseBtn.addEventListener('click', () => {
  if (!isRunning) {
    startPauseBtn.textContent = 'Pause';
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 10);
    isRunning = true;
  } else {
    startPauseBtn.textContent = 'Start';
    elapsedTime = Date.now() - startTime;
    clearInterval(intervalId);
    isRunning = false;
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  isRunning = false;
  elapsedTime = 0;
  timeDisplay.textContent = '00:00:00.00';
  startPauseBtn.textContent = 'Start';
  lapsList.innerHTML = '';
});

lapBtn.addEventListener('click', () => {
  if (isRunning) {
    const lapTime = timeDisplay.textContent;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
    lapsList.appendChild(lapItem);
  }
});

function updateTime() {
  const currentTime = Date.now() - startTime;
  const minutes = Math.floor(currentTime / 60000);
  const seconds = Math.floor((currentTime % 60000) / 1000);
  const milliseconds = Math.floor((currentTime % 1000) / 10);

  timeDisplay.textContent = `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds, 2)}`;
}

function pad(number, digits = 2) {
  return number.toString().padStart(digits, '0');
}

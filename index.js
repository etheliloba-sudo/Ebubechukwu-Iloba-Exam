// Referencing Buttons and Other Display Elements
let startButton = document.getElementById("Start");
let stopButton = document.getElementById("Stop");
let resetButton = document.getElementById("Reset");
let toggleButton = document.getElementById("toggleMode");
let lapButton = document.getElementById("lap");
const lapTimesList = document.getElementById("lap-times");

// Initialising Stopwatch Variables
let hour = 0;
let minute = 0;
let second = 0;
let count = 0; //milliseconds counter
let timer = null;
let lapTimes = []; //Split times array
let lastLapTime = 0;

// Event Listener for Lap Button
lapButton.addEventListener("click", recordLap);

function getCurrentTime() {
  return hour * 360000 + minute * 6000 + second * 100 + count;
}

// Function to record lap times
function recordLap() {
  if (timer) {
    const currentTime = getCurrentTime();
    const currentLapTime = currentTime - lastLapTime;
    lapTimes.push(currentLapTime);
    lastLapTime = currentTime;

    // New list showing lap times and numbers
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapTimes.length}: ${formatTime(
      currentLapTime
    )}`;
    lapTimesList.appendChild(lapItem);
  }
}

function formatTime(centiseconds) {
  const hrs = Math.floor(centiseconds / 360000);
  const mins = Math.floor((centiseconds % 360000) / 6000);
  const secs = Math.floor((centiseconds % 6000) / 100);
  const cs = centiseconds % 100;

  return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
    2,
    "0"
  )}:${String(secs).padStart(2, "0")}:${String(cs).padStart(2, "0")}`;
}

// Light and Dark Mode Toggling
toggleButton.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  // Button change to indicate dark/light theme
  if (document.body.classList.contains("dark-mode")) {
    toggleButton.textContent = "☀️";
  } else {
    toggleButton.textContent = "🌙";
  }
});

// Start Stopwatch
startButton.addEventListener("click", function () {
  if (timer !== null) {
    return;
  }
  timer = setInterval(stopWatch, 10);
});

// Stop Stopwatch
stopButton.addEventListener("click", function () {
  clearInterval(timer);
  timer = null;
});

// Reset Stopwatch
resetButton.addEventListener("click", function () {
  clearInterval(timer);
  timer = null;
  hour = 0;
  minute = 0;
  second = 0;
  count = 0;

  // Update Display
  document.getElementById("hr").innerHTML = "00";
  document.getElementById("min").innerHTML = "00";
  document.getElementById("sec").innerHTML = "00";
  document.getElementById("count").innerHTML = "00";

  // Clear lap data
  lapTimes = [];
  lastLapTime = 0;
  lapTimesList.innerHTML = "";
});

function stopWatch() {
  count++;

  // Convert to seconds, minutes and hours
  if (count == 100) {
    second++;
    count = 0;
  }
  if (second == 60) {
    minute++;
    second = 0;
  }
  if (minute == 60) {
    hour++;
    minute = 0;
    second = 0;
  }
  let hrString = hour;
  let minString = minute;
  let secString = second;
  let countString = count;

 // Convert to two-digit strings for display
  if (hour < 10) {
    hrString = "0" + hrString;
  }
  if (minute < 10) {
    minString = "0" + minString;
  }
  if (second < 10) {
    secString = "0" + secString;
  }
  if (count < 10) {
    countString = "0" + countString;
  }

  // Updating the DOM with formatted time values
  document.getElementById("hr").innerHTML = hrString;
  document.getElementById("min").innerHTML = minString;
  document.getElementById("sec").innerHTML = secString;
  document.getElementById("count").innerHTML = countString;
}

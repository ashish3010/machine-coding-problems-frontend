let time = 0;
let timerRef;

document.getElementById('timer').innerText = formatTime(time);

function formatTime(time) {
  let rem = time;
  let hh = Math.floor(rem / 3600);
  rem = rem - hh * 3600;
  let mm = Math.floor(rem / 60);
  rem = rem - mm * 60;
  let ss = rem;

  return `${hh < 10 ? `0${hh}` : hh}:${mm < 10 ? `0${mm}` : mm}:${
    ss < 10 ? `0${ss}` : ss
  }`;
}

document
  .getElementById('numberInput')
  .addEventListener('change', function onInputChange(e) {
    time = e.target.value;
  });

document.getElementById('start').addEventListener('click', function () {
  startTimeFn();
});

document.getElementById('stop').addEventListener('click', function () {
  clearInterval(timerRef);
});

function startTimeFn() {
  timerRef = setInterval(() => {
    time--;
    document.getElementById('timer').innerText = formatTime(time);
    if (!time) {
      clearInterval(timerRef);
    }
  }, 1000);
}

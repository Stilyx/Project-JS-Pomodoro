const config = document.querySelector('.open-options');
const options = document.querySelector('.options-wrapper');
const timer = document.querySelector('.timer-circle');
const circle = document.querySelector('.content');
const navOptions = document.getElementsByName('menu');
const pomodoro = document.getElementById('pomorodoMinutes');
const clock = timer.childNodes[1];
const stop = document.querySelector('.timer-button');
const submit = document.querySelector('.submit-button');
const navChecked = document.getElementsByName('menu');
const inputsTime = document.getElementsByName('time');
const reset = timer;
let interval = null;

// Event Listeners

stop.addEventListener('click', stopTimer);
config.addEventListener('click', openPopUp);
options.addEventListener('click', closePopUp);
reset.addEventListener('click', resetCountDown);
submit.addEventListener('click', getValues);

// Open options and Close Options

// countdown
let mins = 25;
clock.innerHTML = `${mins}:00`;
let time = Number(mins * 60);

clock.innerHTML = `${mins}:00`;

minutes = mins < 10 ? '0' + mins : mins;
clock.innerHTML = `${minutes}:00`;

console.log(mins);
console.log(time);

const updateCountDown = () => {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  clock.innerHTML = `${minutes}:${seconds}`;
  console.log(mins);
  console.log(time);
  time--;

  if (time === -1) {
    clock.innerHTML = '00:00';
    clearInterval(interval);
    interval = null;
  }
};

// stop countdown

function stopTimer(e) {
  const isClickedArea = e.target.classList[1];

  if (isClickedArea !== 'fa-rotate-left') {
    if (interval === null) {
      timer.childNodes[3].textContent = 'PAUSE';
      timer.childNodes[5].childNodes[5].style.display = 'none';
      timer.childNodes[5].childNodes[3].style.display = 'block';
      setInterval(interval, 1000);
      interval = setInterval(updateCountDown, 1000);
    } else {
      timer.childNodes[3].textContent = 'RESUME';
      timer.childNodes[5].childNodes[5].style.display = 'block';
      timer.childNodes[5].childNodes[3].style.display = 'none';
      clearInterval(interval);
      interval = null;
    }
  }
}

// Reset countdown

function resetCountDown(e) {
  if (e.target.classList[1] === 'fa-rotate-left') {
    timer.childNodes[5].childNodes[3].style.display = 'none';
    timer.childNodes[5].childNodes[5].style.display = 'block';
    timer.childNodes[3].textContent = 'RESUME';
    time = mins * 60;
    clock.innerHTML = `${mins}:00`;

    clearInterval(interval);
    interval = null;
  }
}

function openPopUp(e) {
  options.style.display = 'block';
  timer.childNodes[3].textContent = 'RESUME';
  timer.childNodes[5].childNodes[5].style.display = 'block';
  timer.childNodes[5].childNodes[3].style.display = 'none';
  clearInterval(interval);
  interval = null;
}

function closePopUp(e) {
  const isClicked = e.target.classList[0];
  const clickedOptions = ['options-wrapper', 'close-popup'];
  const close = clickedOptions.some(className => className === isClicked);
  if (close) {
    options.style.display = 'none';
  }
}

function getValues() {
  navChecked.forEach(item => {
    if (item.checked) {
      const itemClassChecked = item.classList[0];
      mins = item.checked;

      inputsTime.forEach(input => {
        if (input.classList[0] === itemClassChecked) {
          mins = Number(input.value);
          time = mins * 60;
          clock.innerHTML = `${mins}:00`;
          clearInterval(interval);
          interval = null;
          options.style.display = 'none';
        }
      });
    }
  });
  const fonts = document.getElementsByName('options');
  fonts.forEach(font => {
    if (font.checked) {
      const fontsName = font.id;
      const fontsId = ['kumbhSans', 'robotoSlab', 'spaceMono'];

      switch (fontsName) {
        case fontsId[0]:
          document.body.style.fontFamily = 'Kumbh Sans';
          break;
        case fontsId[1]:
          document.body.style.fontFamily = 'Roboto Slab';
          break;

        case fontsId[2]:
          document.body.style.fontFamily = 'Space Mono';
          break;
      }
    }
  });
  const colors = document.getElementsByName('customColor');
  colors.forEach(color => {
    if (color.checked) {
      const isColorName = color.id;
      const colorsId = ['red', 'blue', 'purple'];

      switch (isColorName) {
        case colorsId[0]:
          document.documentElement.style.setProperty('--toggle-options', '#f87070');
          break;
        case colorsId[1]:
          document.documentElement.style.setProperty('--toggle-options', '#70F3F8');
          break;
        case colorsId[2]:
          document.documentElement.style.setProperty('--toggle-options', '#D881F8');
          break;
      }
    }
  });
}

navChecked.forEach(item => {
  item.addEventListener('click', e => {
    if (item.checked) {
      inputsTime.forEach(input => {
        const itemClassChecked = item.classList[0];
        if (input.classList[0] === itemClassChecked) {
          timer.childNodes[3].textContent = 'RESUME';
          timer.childNodes[5].childNodes[5].style.display = 'block';
          timer.childNodes[5].childNodes[3].style.display = 'none';
          mins = Number(input.value);
          mins = mins < 10 ? '0' + mins : mins;
          time = mins * 60;
          clock.innerHTML = `${mins}:00`;
          clearInterval(interval);
          interval = null;
          options.style.display = 'none';
        }
      });
    }
  });
});

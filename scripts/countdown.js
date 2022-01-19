const timeElements = document.querySelectorAll('.countdown span');
const body = document.querySelector('#body-container');
const countdown = document.querySelector('#countdown');

let nextDate = Date.now() + 213124121; // en milisegundos

const renderCountDown = () => {
	let now = new Date().getTime();

	let gap = nextDate - now;

	let second = 1000; // 1s
	let minute = second * 60;
	let hour = minute * 60;
	let day = hour * 24;

	let days = Math.floor(gap / day);
	let hours = Math.floor((gap % day) / hour);
	let minutes = Math.floor((gap % hour) / minute);
	let seconds = Math.floor((gap % minute) / second);

	timeElements[0].innerText = days;
	timeElements[1].innerText = hours;
	timeElements[2].innerText = minutes;
	timeElements[3].innerText = seconds;
};

setInterval(function () {
	renderCountDown();
}, 1000);

var myScrollFunc = function () {
	var y = window.scrollY;
	if (y >= 200) {
		countdown.style.visibility = 'visible';
	}
};

window.addEventListener('scroll', myScrollFunc);

const days = document.querySelector('.days');
const hours = document.querySelector('.hours');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const countdown = document.querySelector('.countdown');
const year = document.querySelector('.year');
const loading = document.querySelector('.loading');

const oneSec = 1000;
const oneMin = 60;
const oneHour = 60;
const oneDay = 24;
const currentYear = new Date().getFullYear();
const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

year.textContent = currentYear + 1;



const updateCountdown = () => {
    const currentTime = new Date();
    const diff = newYearTime - currentTime;

    const d = Math.floor(diff / oneSec / oneMin / oneHour / oneDay);
    const h = Math.floor(diff / oneSec / oneMin / oneHour) % oneDay;
    const m = Math.floor(diff / oneSec / oneMin) % oneHour;
    const s = Math.floor(diff / oneSec) % oneMin;

    days.textContent = d;
    hours.textContent = h < 10 ? '0' + h : h;
    minutes.textContent = m < 10 ? '0' + m : m;
    seconds.textContent = s < 10 ? '0' + s : s;
}

setTimeout(() => {
    loading.remove();
    countdown.style.display = 'flex';
}, oneSec);

setInterval(updateCountdown, oneSec);

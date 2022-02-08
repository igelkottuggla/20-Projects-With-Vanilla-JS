const container = document.querySelector('.container');
const text = document.querySelector('.text');

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

const shrinkAnimation = () => {
    setTimeout(() => {
        text.textContent = 'Breath Out';
        container.classList.remove('grow');
        container.classList.add('shrink');
    }, holdTime);
}

const breathAnimation = () => {
    text.textContent = 'Breath In'
    container.classList.add('grow');

    if (container.classList.contains('shrink')) container.classList.remove('shrink');

    setTimeout(() => {
        text.textContent = 'Hold';
        shrinkAnimation();
    }, breatheTime);
}

setInterval(breathAnimation, totalTime)

breathAnimation();

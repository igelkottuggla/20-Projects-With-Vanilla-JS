'use strict';
const word = document.querySelector('.word');
const text = document.querySelector('.text');
const scoreEl = document.querySelector('.score');
const timeEl = document.querySelector('.time');
const endgameEl = document.querySelector('.end-game-container');
const settingsBtn = document.querySelector('.settings-btn');
const settings = document.querySelector('.settings');
const settingsForm = document.querySelector('.settings-form');
const difficultySelect = document.querySelector('.difficulty');

const url = 'https://random-words-api.vercel.app/word';

let randomWord;
let score = 0;
let time = 10;
let difficulty =
    localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

difficultySelect.value =
    localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

const fetchWords = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const word = data[0].word.toLowerCase();

    return word;
};

const gameOver = () => {
    const endGameContent = `
    <h2>Time ran out</h2>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Play again</button>
    `;
    endgameEl.insertAdjacentHTML('afterbegin', endGameContent);
    endgameEl.style.display = 'flex';
};

const updateTime = () => {
    time--;
    timeEl.textContent = `${time}s`;
    if (time === 0) {
        clearInterval(timeInterval);
        gameOver();
    }
};
const timeInterval = setInterval(updateTime, 1000);

const addWordToDOM = async () => {
    randomWord = await fetchWords();
    word.textContent = randomWord;
};

const updateScore = () => {
    score++;
    scoreEl.textContent = score;
};

addWordToDOM();

settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide');
});

settingsForm.addEventListener('change', (event) => {
    difficulty = event.target.value;
    localStorage.setItem('difficulty', difficulty);
});

text.addEventListener('input', (event) => {
    const insertedText = event.target.value;

    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();
        event.target.value = '';
        if (difficulty === 'hard') time += 1;
        else if (difficulty === 'medium') time += 3;
        else time += 5;
        updateTime();
    }
});

// Original code from the course
// const words = [
//     'sigh',
//     'tense',
//     'airplane',
//     'ball',
//     'pies',
//     'juice',
//     'warlike',
//     'bad',
//     'north',
//     'dependent',
//     'steer',
//     'silver',
//     'highfalutin',
//     'superficial',
//     'quince',
//     'eight',
//     'feeble',
//     'admit',
//     'drag',
//     'loving',
// ];
// function getRandomWord() {
//     return words[Math.floor(Math.random() * words.length)];
// }
// function addWordToDOM() {
//     randomWord = getRandomWord();
//     word.innerHTML = randomWord;
// }

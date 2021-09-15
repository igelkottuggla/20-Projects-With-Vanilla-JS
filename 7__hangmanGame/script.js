'use strict';
const wordEl = document.querySelector('.word');
const wrongLettersEl = document.querySelector('.wrong-letters');
const playAgainBtn = document.querySelector('.play-button');
const popup = document.querySelector('.popup-container');
const notification = document.querySelector('.notification-container');
const finalMessage = document.querySelector('.final-message');
const finalMessageRevealWord = document.querySelector('.final-message-reveal-word');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

const correctLetters = [];
const wrongLetters = [];

const displayWord = () => {
    wordEl.innerHTML = `
    ${selectedWord
        .split('')
        .map(
            (letter) => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
        )
        .join('')}
        
  `;

    const innerWord = wordEl.textContent.replace(/\n/g, '');

    if (innerWord === selectedWord) {
        finalMessage.textContent = 'Congratulations! You won!';
        popup.style.display = 'flex';
    }
};

const updateWrongLettersEl = () => {
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    if (wrongLetters.length === figureParts.length) {
        finalMessage.textContent = 'Unfortunately you lost. 😕';
        finalMessageRevealWord.textContent = `...the word was: ${selectedWord}`;
        popup.style.display = 'flex';

        playable = false;
    }
};

const showNotification = () => {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
};

window.addEventListener('keydown', (event) => {
    if (playable) {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            const letter = event.key.toLowerCase();

            if (selectedWord.includes(letter)) {
                if (!correctLetters.includes(letter)) {
                    correctLetters.push(letter);

                    displayWord();
                } else {
                    showNotification();
                }
            } else {
                if (!wrongLetters.includes(letter)) {
                    wrongLetters.push(letter);

                    updateWrongLettersEl();
                } else {
                    showNotification();
                }
            }
        }
    }
});

playAgainBtn.addEventListener('click', () => {
    playable = true;

    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersEl();

    popup.style.display = 'none';
});

displayWord();

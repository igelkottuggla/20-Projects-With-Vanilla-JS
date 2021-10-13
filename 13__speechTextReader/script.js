import data from './data.js';

const main = document.querySelector('.main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.querySelector('.read');
const toggleBtn = document.querySelector('.toggle');
const closeBtn = document.querySelector('.close');

//cards
const createBox = (item) => {
    const box = document.createElement('article');
    const { image, text } = item;

    box.classList.add('box');

    const boxContent = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

    box.insertAdjacentHTML('afterbegin', boxContent);

    main.appendChild(box);

    box.addEventListener('click', () => {
        setTextMessage(text);
        speakText();

        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'), 800);
    });
};

data.forEach(createBox);

//Voices
let voices = [];

const getVoices = () => {
    voices = speechSynthesis.getVoices();

    voices.forEach((voice) => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.textContent = `${voice.name} ${voice.lang}`;

        voicesSelect.appendChild(option);
    });
};
getVoices();

const setVoice = (event) => {
    message.voice = voices.find((voice) => voice.name === event.target.value);
};

const message = new SpeechSynthesisUtterance();

const setTextMessage = (text) => {
    message.text = text;
};

const speakText = () => {
    speechSynthesis.speak(message);
};

//Event Listeners
speechSynthesis.addEventListener('voiceschanged', getVoices);

toggleBtn.addEventListener('click', () =>
    document.querySelector('.text-box').classList.toggle('show')
);

closeBtn.addEventListener('click', () =>
    document.querySelector('.text-box').classList.remove('show')
);

voicesSelect.addEventListener('change', setVoice);

readBtn.addEventListener('click', () => {
    setTextMessage(textarea.value);
    speakText();
});

const cardsContainer = document.querySelector('.cards__container');
const prevBtn = document.querySelector('.button--prev');
const nextBtn = document.querySelector('.button--next');
const currentEl = document.querySelector('.cards__current');
const showBtn = document.querySelector('.header__button');
const hideBtn = document.querySelector('.button--hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.querySelector('.add-card');
const clearBtn = document.querySelector('.button--clear');
const addContainer = document.querySelector('.add-card');

let currentActiveCard = 0;
const cardsEl = [];

const getCardsData = () => {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
};

const setCardsData = (cards) => {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
};

const cardsData = getCardsData();

const createCards = () => {
    cardsData.forEach((data, index) => createCard(data, index));
};

const updateCurrentText = () => {
    currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
};

const createCard = (data, index) => {
    const card = document.createElement('li');
    card.classList.add('cards__card');

    if (index === 0) {
        card.classList.add('card--active');
    }

    card.innerHTML = `
    <div class="card__inner">
        <div class="card__front">
            <p class="card__question">
            ${data.question}
            </p>
        </div>
        <div class="card__back">
            <p class="card__answer">
            ${data.answer}
            </p>
        </div>
    </div>
  `;

    card.addEventListener('click', () => card.classList.toggle('card--show-answer'));

    cardsEl.push(card);
    cardsContainer.appendChild(card);
    updateCurrentText();
};

createCards();

const cardsRewinding = () => {
    cardsEl.forEach((card) => {
        card.classList.remove('card--active');
    });

    if (currentActiveCard > cardsEl.length - 1) {
        currentActiveCard = 0;
    } else if (currentActiveCard < 0) {
        currentActiveCard = cardsEl.length - 1;
    }

    cardsEl[currentActiveCard].classList.add('card--active');

    updateCurrentText();
};

nextBtn.addEventListener('click', () => {
    currentActiveCard = currentActiveCard + 1;
    cardsRewinding();
});

prevBtn.addEventListener('click', () => {
    currentActiveCard = currentActiveCard - 1;
    cardsRewinding();
});

showBtn.addEventListener('click', () => addContainer.classList.add('add-card--show'));

hideBtn.addEventListener('click', () => addContainer.classList.remove('add-card--show'));

addCardBtn.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;

    if (question.trim() && answer.trim()) {
        const newCard = { question, answer };

        createCard(newCard);

        questionEl.value = '';
        answerEl.value = '';

        addContainer.classList.remove('add-card--show');

        cardsData.push(newCard);
        setCardsData(cardsData);
    }
});

clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
});

'use strict';

import { formatMoney } from './utils.js';

const main = document.querySelector('.main');
const urlAdress = 'https://randomuser.me/api';

let data = [];

// function getRandomUser() {
//     fetch('https://randomuser.me/api')
//         .then((response) => response.json())
//         .then((data) => console.log(data));
// }

export const getRandomUser = async () => {
    const response = await fetch(urlAdress);
    const data = await response.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000),
    };

    addData(newUser);
};

const updateDOM = (providedData = data) => {
    main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

    providedData.forEach((person) => {
        const personEl = document.createElement('div');
        personEl.classList.add('person');
        const personData = `<strong>${person.name}</strong>$${formatMoney(
            person.money
        )}`;
        personEl.insertAdjacentHTML('afterbegin', personData);

        main.appendChild(personEl);
    });
};

const addData = (object) => {
    data.push(object);

    updateDOM();
};

export const doubleMoney = () => {
    data = data.map((user) => {
        return { ...user, money: user.money * 2 };
    });

    updateDOM();
    console.log(data);
};

export const sortByRichest = () => {
    data.sort((a, b) => {
        return b.money - a.money;
    });
    updateDOM();
};

export const showMillionaires = () => {
    data = data.filter((person) => person.money > 1000000);

    updateDOM();
    console.log(data);
};

export const calculateWealth = () => {
    const totalWealth = data.reduce((accum, user) => {
        return (accum += user.money);
    }, 0);

    const wealthEl = document.createElement('div');
    wealthEl.classList.add('wealth');
    const wealthData = `<h3>Total Wealth: <strong>${formatMoney(
        totalWealth
    )}</strong></h3>`;
    wealthEl.insertAdjacentHTML('afterbegin', wealthData);

    main.appendChild(wealthEl);
};

export default {
    getRandomUser,
    doubleMoney,
    sortByRichest,
    showMillionaires,
    calculateWealth,
};

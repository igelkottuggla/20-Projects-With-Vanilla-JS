const balance = document.querySelector('.balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.querySelector('.list');
const form = document.querySelector('.form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const submitBtn = document.querySelector('.submit');

const localStorageTransaction = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransaction : [];

const createNotification = (message) => {
    const notif = document.createElement('div');
    notif.classList.add('toast');
    notif.classList.add('error');

    notif.textContent = message;
    toasts.appendChild(notif);

    setTimeout(() => {
        notif.remove();
    }, 3000);
};

const generateRandomID = () => {
    return Math.floor(Math.random() * 1000000000);
};

const addTransaction = (event) => {
    event.preventDefault();
    if (text.value.trim() === '' || amount.value.trim() === '') {
        createNotification('Please, enter the proper values');
    } else {
        const transaction = {
            id: generateRandomID(),
            text: text.value,
            amount: +amount.value,
        };

        transactions.push(transaction);
        addTransactionToDOM(transaction);
        updateValues(transaction);
        updateLocalStorage();

        text.value = '';
        amount.value = '';
    }
};

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
};

const removeTransaction = (id) => {
    transactions = transactions.filter((transaction) => transaction.id !== id);
    updateLocalStorage();
    init();
};

const addTransactionToDOM = (transaction) => {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');

    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
};

const updateValues = () => {
    const amounts = transactions.map((transaction) => transaction.amount);
    const total = amounts.reduce((accum, item) => (accum += item), 0).toFixed(2);

    const income = amounts
        .filter((item) => item > 0)
        .reduce((accum, item) => (accum += item), 0)
        .toFixed(2);

    const expense = amounts
        .filter((item) => item < 0)
        .reduce((accum, item) => (accum += item), 0)
        .toFixed(2);

    moneyPlus.textContent = `$${income}`;
    moneyMinus.textContent = `$${expense}`;
    balance.textContent = `$${total}`;
};

const init = () => {
    list.innerHTML = '';
    transactions.forEach(addTransactionToDOM);
    updateValues();
};

init();

form.addEventListener('submit', addTransaction);

'use strict';

const currencyElOne = document.getElementById('currency-one');
const amountElOne = document.querySelector('.amount-one');
const currencyElTwo = document.getElementById('currency-two');
const amountElTwo = document.querySelector('.amount-two');
const rateEl = document.querySelector('.rate');
const swap = document.getElementById('swap');

const url = 'https://open.exchangerate-api.com/v6/latest';

//Fetch exchange rates and update the DOM
const calculate = async () => {
    const currencyOne = currencyElOne.value;
    const currencyTwo = currencyElTwo.value;

    const response = await fetch(url);
    const data = await response.json();

    const rate = data.rates[currencyTwo] / data.rates[currencyOne];
    rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
    amountElTwo.value = (amountElOne.value * rate).toFixed(2);

    //original option from the course
    // fetch(url)
    //     .then((res) => res.json())
    //     .then((data) => {
    //         const rate = data.rates[currencyTwo] / data.rates[currencyOne];
    //         rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
    //         amountElTwo.value = (amountElOne.value * rate).toFixed(2);
    //     });
};

//Event listeners
currencyElOne.addEventListener('change', calculate);
currencyElTwo.addEventListener('change', calculate);
amountElOne.addEventListener('input', calculate);
amountElTwo.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyElOne.value;
    currencyElOne.value = currencyElTwo.value;
    currencyElTwo.value = temp;
    calculate();
});

calculate();

'use strict';
const search = document.querySelector('.search-input');
const sumbitBtn = document.querySelector('.submit');
const randomBtn = document.querySelector('.random-btn');
const mealsEl = document.querySelector('.meals');
const resultHeading = document.querySelector('.result-heading');
const singleMealEl = document.querySelector('.single-meal');

function searchMeals(event) {
    event.preventDefault();

    singleMealEl.innerHTML = '';

    const term = search.value;

    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

                if (data.meals === null) {
                    resultHeading.innerHTML = `<p>There are no search results. Try again!<p>`;
                } else {
                    mealsEl.innerHTML = data.meals
                        .map(
                            (meal) => `
                            <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                            <div class="meal-info" data-mealID="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                            </div>
                            </div>
                        `
                        )
                        .join('');
                }
            });
        // Clear search text
        search.value = '';
    } else {
        createNotification('Please, fill in the search form');
    }
}

function createNotification(message) {
    const notif = document.createElement('div');
    notif.classList.add('toast');
    notif.classList.add('error');

    notif.textContent = message;
    toasts.appendChild(notif);

    setTimeout(() => {
        notif.remove();
    }, 3000);
}

function getMealByID(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then((res) => res.json())
        .then((data) => {
            const meal = data.meals[0];

            addMealToDOM(meal);
        });
}

function addMealToDOM(meal) {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }

    singleMealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map((ing) => `<li>${ing}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}

function getRandomMeal() {
    // Clear meals and heading
    mealsEl.innerHTML = '';
    resultHeading.innerHTML = '';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then((res) => res.json())
        .then((data) => {
            const meal = data.meals[0];

            addMealToDOM(meal);
        });
}

sumbitBtn.addEventListener('submit', searchMeals);
randomBtn.addEventListener('click', getRandomMeal);

mealsEl.addEventListener('click', (event) => {
    const mealInfo = event.path.find((item) => {
        if (item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false;
        }
    });

    if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealId');
        getMealByID(mealID);
    }
});

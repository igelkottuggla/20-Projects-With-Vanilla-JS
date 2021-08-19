'use strict';

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.querySelector('.count');
const total = document.querySelector('.total');
const movieSelect = document.querySelector('.movie-item');

let ticketPrice = +movieSelect.value;

populateUI();

const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatIndexes = [...selectedSeats].map((seat) =>
        [...seats].indexOf(seat)
    );

    sessionStorage.setItem('selectedSeats', JSON.stringify(seatIndexes));

    const selectedSeatsCount = selectedSeats.length;
    count.textContent = selectedSeatsCount;
    total.textContent = selectedSeatsCount * ticketPrice;
};

function populateUI() {
    const selectedSeats = JSON.parse(sessionStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = sessionStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

const setModieData = (movieIndex, moviePrice) => {
    sessionStorage.setItem('selectedMovieIndex', movieIndex);
    sessionStorage.setItem('selectedMoviePrice', moviePrice);
};

movieSelect.addEventListener('change', (event) => {
    ticketPrice = event.target.value;
    setModieData(event.target.selectedIndex, event.target.value);
    updateSelectedCount(0);
});

container.addEventListener('click', (event) => {
    if (
        event.target.classList.contains('seat') &&
        !event.target.classList.contains('occupied')
    ) {
        event.target.classList.toggle('selected');
    }

    updateSelectedCount();
});

updateSelectedCount();

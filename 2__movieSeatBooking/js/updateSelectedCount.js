'use strict';

const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.querySelector('.count');
const total = document.querySelector('.total');
const movieSelect = document.querySelector('.movie-item');

let ticketPrice = +movieSelect.value;

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

export default updateSelectedCount;

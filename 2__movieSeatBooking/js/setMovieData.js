'use strict';

const setModieData = (movieIndex, moviePrice) => {
    sessionStorage.setItem('selectedMovieIndex', movieIndex);
    sessionStorage.setItem('selectedMoviePrice', moviePrice);
};

export default setModieData;

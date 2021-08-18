'use strict';
import { showError, showSucces } from './error-success.js';

function checkEmail(input) {
    const regExp =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regExp.test(input.value.trim())) {
        showSucces(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

export default checkEmail;

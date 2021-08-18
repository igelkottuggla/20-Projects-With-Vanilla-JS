'use strict';

export function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const errorMsg = formControl.querySelector('small');
    errorMsg.textContent = message;
}

export function showSucces(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

'use strict';

import { showError, showSucces } from './error-success.js';

function checkPassworsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, `Please check! Passwords don't match`);
    } else {
        showSucces(input1, input2);
    }
}

export default checkPassworsMatch;

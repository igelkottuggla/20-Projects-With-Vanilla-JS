'use strict';

import { showError, showSucces } from './error-success.js';
import { getFieldName } from './utils.js';

function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
            isRequired = true;
        } else {
            showSucces(input);
        }
    });
}

export default checkRequired;

'use strict';

import { showError, showSucces } from './error-success.js';
import { getFieldName } from './utils.js';

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(
            input,
            `${getFieldName(input)} must me at least ${min} characters`
        );
    } else if (input.value.length > max) {
        showError(
            input,
            `${getFieldName(input)} can't be more than ${max} characters`
        );
    } else {
        showSucces(input);
    }
}

export default checkLength;

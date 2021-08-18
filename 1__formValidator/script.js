'use stict';

import checkEmail from './js/checkEmail.js';
import checkRequired from './js/checkRequired.js';
import checkPassworsMatch from './js/checkPasswordMatch.js';
import checkLength from './js/checkLength.js';
import { getEl } from './js/utils.js';

const form = getEl('.form');
const username = getEl('.username');
const email = getEl('.email');
const password = getEl('.password');
const passwordConfirm = getEl('.password-confirm');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!checkRequired([username, email, password, passwordConfirm])) {
        checkLength(username, 3, 15);
        checkLength(password, 6, 25);
        checkEmail(email);
        checkPassworsMatch(password, passwordConfirm);
    }
});

'use strict';

export const getEl = (selection) => {
    const el = document.querySelector(selection);
    if (el) return el;
    else throw new Error(`There's not such element ${selection}`);
};

export function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

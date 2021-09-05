'use strict';

const toggle = document.querySelector('.toggle');
const close = document.querySelector('.close');
const open = document.querySelector('.open');
const modal = document.querySelector('.modal-container');
const navbar = document.querySelector('.navbar');

toggle.addEventListener('click', () => {
    navbar.classList.toggle('show-nav');
});

open.addEventListener('click', () => modal.classList.add('show-modal'));
close.addEventListener('click', () => modal.classList.remove('show-modal'));

window.addEventListener('click', (event) => {
    event.target === modal ? modal.classList.remove('show-modal') : false;
});

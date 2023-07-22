/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
window.addEventListener('DOMContentLoaded', () => {
    //webpack
    const tabs = require('./modules/tabs'),
        modal = require('./modules/modal'),
        timer = require('./modules/timer'),
        slider = require('./modules/slider'),
        calc = require('./modules/calc'),
        cards = require('./modules/cards'),
        forms = require('./modules/forms');

    tabs();
    modal();
    timer();
    slider();
    calc();
    cards();
    forms();



});



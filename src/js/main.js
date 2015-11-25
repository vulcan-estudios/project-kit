let $ = require('jquery');
let _ = require('underscore');
let Backbone = require('backbone');

let lib1 = require('libs/lib1');

let app = {
    lib1: lib1
};

window.app = app;

$(window).ready(function ($) {
    console.log('lib example:');
    console.log('10 + 20 =', lib1(10, 20));
});

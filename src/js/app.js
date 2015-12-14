let $ = require('jquery');
let _ = require('underscore');
let Backbone = require('backbone');

const lib1 = require('libs/lib1');
const src1 = require('../templates/src1.html');

let app = {
    lib1: lib1,
    src1: src1
};

window.app = app;

$(window).ready(function ($) {
    var n1 = 37;
    var n2 = 42;

    console.log('lib example:');
    console.log('37 + 42 =', lib1(37, 42));
});

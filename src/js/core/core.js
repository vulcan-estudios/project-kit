window.$ = window.jQuery = require('jquery');
window._ = require('underscore');
window.Backbone = require('backbone');

require('./vendors/foundation/foundation.core');
require('./vendors/foundation/foundation.util.keyboard');
require('./vendors/foundation/foundation.util.box');
require('./vendors/foundation/foundation.util.triggers');
require('./vendors/foundation/foundation.util.mediaQuery');
require('./vendors/foundation/foundation.util.motion');

require('./vendors/foundation/foundation.tooltip');
require('./vendors/foundation/foundation.reveal');

require('./ga');

_.templateSettings = {
    evaluate    : /{{([\s\S]+?)}}/g,
    interpolate : /{{=([\s\S]+?)}}/g,
    escape      : /{{-([\s\S]+?)}}/g
};

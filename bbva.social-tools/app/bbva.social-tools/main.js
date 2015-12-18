(function($window) {
    'use strict'

    var socialtools = require('./core/core')();

    $window.bbva = $window.bbva || {};
    $window.bbva.socialtools = $window.bbva.socialtools || {};

    socialtools.init($window.bbva.socialtools);

})(window);
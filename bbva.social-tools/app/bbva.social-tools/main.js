(function($window) {
    'use strict'

    var socialTools = require('./core/core');

    $window.bbva = $window.bbva || {};
    $window.bbva.socialtools = $window.bbva.socialtools || {};

    socialTools.init($window.bbva.socialtools);

})(window);
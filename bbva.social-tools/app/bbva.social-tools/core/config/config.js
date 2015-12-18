(function($window) {
    'use strict'

    module.exports = function(properties) {

        var display = require('../services/display')();

        /**
         * Config Class that provides methods to configure
         * the HPD-Mobile library
         * @param {object} properties
         */
        var Config = function() {


            /** @type {object} Object used to load external libraries in synch mode */
            this.librariesLoader = require('./librariesLoader')(properties);

            /**
             * Constructor of Config object.
             * @return {[type]} [description]
             */
            function __init__() {

                /** We have to set the environment and the remote connector to bbva-intranet */

                var cssUrl = properties.config.css.url;
                display.loadCSS(cssUrl);

            }

            __init__.call(this);

        };

        /**
         * Function that brings external libraries neccessary for HPD Module 
         * @param  {Function} onSuccess [When libraries are loaded, we call to onSuccess]
         * @param {Function} onError [When we fail laoding libraries or calling to session or properties, we call onError]
         * @return {[type]}            [description]
         */
        Config.prototype.loadLibraries = function(libraries, onSuccess, onError, synchronously) {

            this.librariesLoader.loadLibraries(libraries, onSuccess, onError, synchronously);

        }

        /**
         * Public start method of HPD library to start the library
         * @return {[type]} [description]
         */
        Config.prototype.start = function() {
            if (typeof this.onStart == "function") {
                this.onStart();
            }
        }

        return new Config();

    }


})(window);

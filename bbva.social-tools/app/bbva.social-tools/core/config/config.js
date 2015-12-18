(function($window) {
    'use strict'


    var display = require('../services/display');

    /**
     * Config Class that provides methods to configure
     * the HPD-Mobile library
     * @param {object} properties
     */
    var Config = function(properties) {

        this.properties = properties;
        /** @type {object} Object used to load external libraries in synch mode */
        this.librariesLoader = require('./librariesLoader')(this.properties);

        /**
         * Constructor of Config object.
         * @return {[type]} [description]
         */
        function __init__() {

            /** We have to set the environment and the remote connector to bbva-intranet */

            var cssUrl = this.properties.config.css.url;                            
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


    /**
     * Export the object through module.exports
     * @param  {object} moduleProperties literal object that provide HPD Mobile library configuration
     * @param  {object} properties       literal object that stores HPD properties
     * @return {[type]}                  [description]
     */
    module.exports = function(properties) {
        return new Config(properties);
    };


})(window);
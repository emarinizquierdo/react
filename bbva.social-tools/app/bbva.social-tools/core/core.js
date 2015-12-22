(function() {
    'use strict'

    require('./utils/extend');

    var properties = require('./config/properties'),
        lang = require('./services/lang')(properties),
        styles = require('./services/styles')(properties),
        components = require('./services/components')(properties, lang),
        utils = require('./utils/utils');
    
    

    module.exports = function() {


        /****************************************************
                    BBVA - socialTools - Library

        ******************************************************/
        function ST() {

        }

        /** Initial SocialTools function */
        ST.prototype.init = function( library ) {

            styles.load();

            components.register( library );

            library.setLang = function( language ){
                lang.setLang(language);
            }

        };


        return new ST();
    }

})();
(function() {
    'use strict'

    var properties = require('./config/properties'),
        configurator = require('./config/config')(properties),
        components = require('./services/components')(properties),
        utils = require('./utils/utils');

    module.exports = function() {


        /****************************************************
                    BBVA - socialTools - Library

        ******************************************************/
        function ST() {

        }

        /** Initial SocialTools function */
        ST.prototype.init = function( library ) {

            /** If React has been loaded, we don't have to load this again */
            if (typeof React === "object" && parseFloat(React.version) >= 0.14) {
                components.registerAll( library );
            /** If React hasn't been loaded, we have to load this synchronously */
            } else {

                components.registerAll( library );

                configurator.loadLibraries(properties.config.libraries.react, function(session) {

                    var event = new Event('reactLoaded');
                    // Dispatch the event.
                    document.dispatchEvent(event);

                }.bind(this), function() {


                }.bind(this), true);

            }

        };

        return new ST();
    }

})();
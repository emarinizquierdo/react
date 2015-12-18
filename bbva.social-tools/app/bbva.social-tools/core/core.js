(function() {

    'use strict'

    var properties = require('./config/properties'),
        configurator = require('./config/config')(properties),
        feedbackFaces = require('./services/feedbackFaces')(properties),
        utils = require('./utils/utils');

    /****************************************************
                BBVA - socialTools - Library

    ******************************************************/
    var ST = function() {

        this.properties = properties;

    };

    /** Initial SocialTools function */
    ST.prototype.init = function() {

        /** If React has been loaded, we don't have to load this again */
        if (typeof React === "object" && parseFloat(React.version) >= 0.14) {

        /** If React hasn't been loaded, we have to load this synchronously */
        } else {

            configurator.loadLibraries(properties.libraries.react, function(session) {

                var BeerListClass = require('./components/BeerList');
                var BeerList = new BeerListClass();

                ReactDOM.render( < BeerList / > , document.getElementById('content'));

            }.bind(this), function() {


            }.bind(this), true);
        }

    };

    /** @type {function} [description] */
    ST.prototype.feedbackFaces = feedbackFaces;


    module.exports = new ST();

})();
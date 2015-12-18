(function() {
    'use strict'

    module.exports = function(properties) {

        /** Import of components classes **/
        var FeedbackFacesClass = require('../components/feedbackFaces');

        function Components() {

        }


        Components.prototype.register = function() {




        };

        Components.prototype.registerAll = function(library) {

            library.feedbackFaces = new FeedbackFacesClass(properties);

        };

        return new Components();

    }



})();

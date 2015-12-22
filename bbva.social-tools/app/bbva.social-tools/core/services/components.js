(function() {
    'use strict'

    module.exports = function(properties, lang) {

        /** Import of components classes **/
        var FeedbackFacesClass = require('../components/feedbackFaces')(properties, lang);

        function Components() {

        }

        Components.prototype.register = function(library) {

            library.feedbackFaces = FeedbackFacesClass;

        };


        return new Components();

    }

})()
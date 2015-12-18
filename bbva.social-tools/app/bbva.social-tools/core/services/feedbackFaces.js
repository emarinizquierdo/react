(function() {
    'use strict'

    //var template = require("../../templates/feedbackFaces.hbs");


    function feedbackFaces(properties) {

        var isAnguarjs = typeof angular === 'object';


        function createFeedbackFaces(parent) {

        }

        function defineAngularjsDirective() {

            angular.module(properties.angular.moduleNames.FEEDBACK_FACES, []);

            app.run(['$templateCache', function($templateCache) {
                //$templateCache.put('login.html', require('./login.html') );
            }]);

        }

        function __init__() {

            if (isAnguarjs) {
                defineAngularjsDirective();
            } else {
                console.log('entrando');
            }


        }

        __init__();


    }

    module.exports = feedbackFaces;


})();
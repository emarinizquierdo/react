(function() {

    module.exports = function(properties, lang) {

        var Component = require('../../services/component');
        var utils = require('../../utils/utils');
        var Http = require('../../utils/http');
        var FaceItem = require('./faceItem');
        var Loader = require('../loader');
        var Literal = require('../literal')(properties, lang);
        var Error = require('./error')(properties, lang);
        var dictionary = require('./lang').dictionary;

        var MOODS = ['sad', 'neutral', 'happy'];

        var RATING = {
            'NEGATIVE': 'sad',
            'NEUTRAL': 'neutral',
            'POSITIVE': 'happy'
        };

        function FeedbackFaces(selector_id) {

            /**
             * Private Members
             */
            var container = document.getElementById(selector_id),
                loader,
                literal,
                error,
                feedbackContainer,
                feedbackTitle,
                facesList,
                faces = {};

            /**
             * Call the constructor
             */
            __init__()

            /**
             * Constructor
             */
            function __init__() {

                //
                lang.addDictionary(dictionary);

                loader = new Loader();
                literal = new Literal();
                error = new Error();

                feedbackContainer = container.appendChild(new utils.element('div', ['class', 'st-feedback-container']));
                feedbackContainer.appendChild(loader.element);
                feedbackContainer.appendChild(error.element);
                feedbackTitle = feedbackContainer.appendChild(literal.element);
                feedbackTitle.stAddClass('feedback-title');
                facesList = feedbackContainer.appendChild(new utils.element('ul', ['class', 'faces-list']));

                createFaces();
                checkStatus();

            }

            function lock(lock) {

                for (var i = 0; i < MOODS.length; i++) {
                    faces[MOODS[i]].lock(lock);
                }

            }

            function createFaces() {

                for (var i = 0; i < MOODS.length; i++) {
                    faces[MOODS[i]] = new FaceItem(MOODS[i]);
                    facesList.appendChild(faces[MOODS[i]].element);
                    faces[MOODS[i]].onClick = vote;
                }

            }

            function checkStatus() {

                loader.show();

                setTimeout(function() {

                    Http.get('http://localhost:8081/app/bbva.social-tools/core/dummies/responseGet.json', function(data) {

                        //If there's rating propertie, user has already voted
                        if (data && data.rating) {
                            lock(true);
                            faces[RATING[data.rating]].setActive(true);
                            loader.hide();
                            literal.setText("FEEDBACK_DONE");

                            //Unless, we have to unlock interaction
                        } else {
                            lock(false);
                            loader.hide();
                            literal.setText("FEEDBACK_QUIZ");
                        }

                    }, function(data) {

                        lock(false);
                        loader.hide();
                        error.showError("GET_ERROR", true);

                    });

                }, 1500);

            }


            function vote(status) {

                loader.show();

                setTimeout(function() {

                    Http.get('http://localhost:8081/app/bbva.social-tools/core/dummies/responsePost.json', function(data) {

                        //If there's rating propertie, user has already voted
                        if (data && data.rating) {
                            lock(true);
                            faces[RATING[data.rating]].setActive(true);
                            loader.hide();
                            literal.setText("FEEDBACK_DONE");
                            //Unless, we have to unlock interaction
                        } else {
                            lock(false);
                            loader.hide();
                            literal.setText("FEEDBACK_QUIZ");
                        }

                    }, function() {

                        lock(false);
                        loader.hide();
                        error.showError("VOTE_ERROR");

                    });

                }, 1500);
            }

            this.align = function(align) {

                switch (align) {
                    case 'left':
                        feedbackContainer.stAddClass('left');
                        feedbackContainer.stRemoveClass('right');
                        break;
                    case 'right':
                        feedbackContainer.stAddClass('right');
                        feedbackContainer.stRemoveClass('left');
                        break;

                    default:
                        feedbackContainer.stRemoveClass('left');
                        feedbackContainer.stRemoveClass('right');

                }

                return this;

            }

        }

        return new Component(FeedbackFaces)

    }


})();
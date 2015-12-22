(function() {

    module.exports = function(properties, lang) {

        var Component = require('../../services/component');
        var utils = require('../../utils/utils');
        var Http = require('../../utils/http');
        var FaceItem = require('./faceItem');
        var Loader = require('../loader');
        var Literal = require('../literal')(properties, lang);
        var dictionary = require('./lang').dictionary;

        var MOODS = ['sad', 'neutral', 'happy'];

        var RATING = {
            'NEGATIVE': 'sad',
            'NEUTRAL': 'neutral',
            'POSITIVE': 'happy'
        };

        function FeedbackFaces(selector_id) {

            this.container = document.getElementById(selector_id);
            this.loader;
            this.feedbackContainer;
            this.feedbackTitle;
            this.facesList;
            this.faces = {};

            __init__.call(this);
        }

        function __init__() {

            //
            lang.addDictionary(dictionary);

            this.feedbackContainer = this.container.appendChild(new utils.element('div', ['class', 'feedback-container']));
            this.loader = new Loader();
            this.feedbackContainer.appendChild(this.loader.element);
            this.literal = new Literal();
            this.feedbackTitle = this.feedbackContainer.appendChild(this.literal.element);
            this.feedbackTitle.stAddClass('feedback-title');
            this.facesList = this.feedbackContainer.appendChild(new utils.element('ul', ['class', 'faces-list']));

            createFaces.call(this);
            checkStatus.call(this);

        }

        FeedbackFaces.prototype.lock = function(lock) {

            for (var i = 0; i < MOODS.length; i++) {
                this.faces[MOODS[i]].lock(lock);
            }

        }

        function createFaces() {

            for (var i = 0; i < MOODS.length; i++) {
                this.faces[MOODS[i]] = new FaceItem(MOODS[i]);
                this.facesList.appendChild(this.faces[MOODS[i]].element);
                this.faces[MOODS[i]].onClick = vote.bind(this);
            }

        }

        function checkStatus() {

            this.loader.show();

            setTimeout(function() {

                Http.get('/app/bbva.social-tools/core/dummies/responseGet.json', function(data) {

                    //If there's rating propertie, user has already voted
                    if (data && data.rating) {
                        this.lock(true);
                        this.faces[RATING[data.rating]].setActive(true);
                        this.loader.hide();
                        this.literal.setText("FEEDBACK_DONE");

                        //Unless, we have to unlock interaction
                    } else {
                        this.lock(false);
                        this.loader.hide();
                        this.literal.setText("FEEDBACK_QUIZ");
                    }

                }.bind(this), function() {

                    this.lock(false);

                }.bind(this));

            }.bind(this), 1500);

        }


        function vote(status) {

            this.loader.show();

            setTimeout(function() {

                Http.get('/app/bbva.social-tools/core/dummies/responsePost.json', function(data) {

                    //If there's rating propertie, user has already voted
                    if (data && data.rating) {
                        this.lock(true);
                        this.faces[RATING[data.rating]].setActive(true);
                        this.loader.hide();
                        this.literal.setText("FEEDBACK_DONE");
                        //Unless, we have to unlock interaction
                    } else {
                        this.lock(false);
                        this.loader.hide();
                        this.literal.setText("FEEDBACK_QUIZ");
                    }

                }.bind(this), function() {

                    this.lock(false);

                }.bind(this));

            }.bind(this), 1500);
        }

        return new Component(FeedbackFaces)

    }


})();
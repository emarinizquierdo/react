(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

        var utils = require('../../utils/utils');
        
        var ACTIVE_CLASS = 'active',
            LOCKED_CLASS = 'locked';

        function FaceItem( mood ) {

            this.element = new utils.element('li');
            this.spanElement;
            this.active = false;
            this.locked = true;

            __init__.call(this, mood);

        }

        function __init__( mood ){

            this.spanElement = new utils.element('span', ['class', 'wr-sprite']);
            this.spanElement.stAddClass(' face-' + mood + '-icon');
            this.spanElement.stAddClass(LOCKED_CLASS);
            this.element.appendChild(this.spanElement);

            setUserInteraction.call(this);

        }

        /**
         * Method to set active a faces. It will be only active if it is not locked.
         * If active parameter is not passed, it will return active status
         * @param {boolean} active [description]
         */
        FaceItem.prototype.setActive = function( active ){

            if(typeof active === "undefined"){
                return this.active;
            }else{
                this.active = active;
                if(active){
                    this.spanElement.stAddClass( ACTIVE_CLASS );
                }else{
                    this.spanElement.stRemoveClass( ACTIVE_CLASS );
                }
            }
        };

        /**
         * Method that locks a face interaction and styles
         * @param  {boolean} lock [description]
         * @return {[type]}      [description]
         */
        FaceItem.prototype.lock = function ( lock ){

            if(typeof lock === "undefined"){
                return this.locked;
            }else{
                this.locked = lock;
                if(lock){
                    this.spanElement.stAddClass( LOCKED_CLASS );
                }else{
                    this.spanElement.stRemoveClass( LOCKED_CLASS );
                }
                setUserInteraction.call(this, lock);
            }

        };

        FaceItem.prototype.setOnClick = function( onClickFunction ){
            this.onClick = onClickFunction;
        }

        function setUserInteraction( bind ){

            this.spanElement.onclick= (!bind) ? function(){

                this.onClick(this.active);

            }.bind(this) : null;

        }

        module.exports = FaceItem;


})();
},{"../../utils/utils":15}],2:[function(require,module,exports){
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
},{"../../services/component":9,"../../utils/http":14,"../../utils/utils":15,"../literal":5,"../loader":6,"./faceItem":1,"./lang":3}],3:[function(require,module,exports){
(function(){
	'use strict'

	exports.dictionary = {
		"es_ES" : {
			FEEDBACK_QUIZ: "¿Te ha resultado fácil este proceso?",
			FEEDBACK_DONE: "Ya has valorado este proceso:"
		},
		"en_US" : {
			FEEDBACK_QUIZ: "Did you find this process easy?",
			FEEDBACK_DONE: "You have already rated this process:"
		}
	}

})()
},{}],4:[function(require,module,exports){
(function() {

    module.exports = function(properties, lang) {

        var utils = require('../../utils/utils');

        function Literal() {

            this.element = new utils.element('div');

            __init__.call(this);

        }

        function __init__() {

        }

        Literal.prototype.setText = function(text) {

            this.element.innerHTML = lang.words[text];

            document.addEventListener(properties.events.LANG_CHANGED, function() {
                this.element.innerHTML = lang.words[text];
            }.bind(this));

        };

        return Literal;

    }

})();
},{"../../utils/utils":15}],5:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"../../utils/utils":15,"dup":4}],6:[function(require,module,exports){
(function() {

    var Component = require('../../services/component');
    var utils = require('../../utils/utils');

    function Loader() {

        this.element = new utils.element('div', ['class', 'activity-indicator']);

        __init__.call(this);
    }

    function __init__() {

        this.spinWrapper = this.element.appendChild(new utils.element('div', ['class', 'spin-wrapper']));
        this.spin = this.spinWrapper.appendChild(new utils.element('span', ['class', 'glyphicons-sprite spinner spin']));

    }

    Loader.prototype.show = function() {
    	this.element.appendChild(this.spinWrapper);
        this.element.stRemoveClass('hide');

    };

    Loader.prototype.hide = function() {
    	this.element.stAddClass('hide');
        this.spinWrapper.remove();
    };

    module.exports = Loader;


})();
},{"../../services/component":9,"../../utils/utils":15}],7:[function(require,module,exports){
(function() {
    'use strict';


    exports.config = {
        css: [
            "https://storage.googleapis.com/bbva-front.appspot.com/hpd.mobile/version/1.0.0/main.css"
        ]
    };

    exports.events = {
        LANG_CHANGED: "bbva.socialtools.langChanged"
    };



})();
},{}],8:[function(require,module,exports){
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
},{"./config/properties":7,"./services/components":10,"./services/lang":11,"./services/styles":12,"./utils/extend":13,"./utils/utils":15}],9:[function(require,module,exports){
(function() {
    'use strict'


        function Component(constructorClass) {

            this.constructor = constructorClass;

        };

        Component.prototype.render = function(selector_id) {

            this.instance = new this.constructor(selector_id);
            
        }

        module.exports = Component;


})();
},{}],10:[function(require,module,exports){
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
},{"../components/feedbackFaces":2}],11:[function(require,module,exports){
(function() {
    'use strict'

    var utils = require('../utils/utils');

    module.exports = function(properties){
	    function Lang() {

	        this.currentLang = "es_ES";
	        this.DICTIONARY = {
	            "es_ES": {},
	            "en_US": {}
	        };

	        this.words = this.DICTIONARY[this.currentLang];

	    }

	    Lang.prototype.setLang = function(lang) {

	        this.currentLang = (lang == "en_US") ? "en_US" : "es_ES";
	        this.words = this.DICTIONARY[this.currentLang];
	        var event = new Event(properties.events.LANG_CHANGED);
	        // Dispatch the event.
	        document.dispatchEvent(event);
	    }

	    Lang.prototype.addDictionary = function(subset) {

	        utils.extend(this.DICTIONARY, subset);
	        this.words = this.DICTIONARY[this.currentLang];

	    };

	    return new Lang();

	}

})();
},{"../utils/utils":15}],12:[function(require,module,exports){
(function() {
    'use strict'

    module.exports = function(properties) {

        function Display() {

            this.body = document.body;

        }

        /**
         * Inject to hosted application hpd-mobile styles
         * @param  {string} url [description]
         * @return {[type]}     [description]
         */
        Display.prototype.load = function(url) {

            for (var i = 0; i < properties.config.css.length; i++) {
                var link = document.createElement('link')
                link.setAttribute('rel', 'stylesheet')
                link.setAttribute('type', 'text/css')
                link.setAttribute('href', properties.config.css[i])
                document.getElementsByTagName('head')[0].appendChild(link);
            }
        }

        return new Display();
    }

})();
},{}],13:[function(require,module,exports){
(function(Element) {
	'use strict'

    Element.prototype.stHasClass = function(className) {
        return new RegExp(' ' + className + ' ').test(' ' + this.className + ' ');
    };

    Element.prototype.stAddClass = function(className) {
        if (!this.stHasClass(className)) {
            this.className += ' ' + className;
        }
        return this;
    };

    Element.prototype.stRemoveClass = function(className) {
        var newClass = ' ' + this.className.replace(/[\t\r\n]/g, ' ') + ' ';
        if (this.stHasClass(className)) {
            while (newClass.indexOf(' ' + className + ' ') >= 0) {
                newClass = newClass.replace(' ' + className + ' ', ' ');
            }
            this.className = newClass.replace(/^\s+|\s+$/g, ' ');
        }
        return this;
    };

    Element.prototype.stToggleClass = function(className) {
        var newClass = ' ' + this.className.replace(/[\t\r\n]/g, " ") + ' ';
        if (this.stHasClass(className)) {
            while (newClass.indexOf(" " + className + " ") >= 0) {
                newClass = newClass.replace(" " + className + " ", " ");
            }
            this.className = newClass.replace(/^\s+|\s+$/g, ' ');
        } else {
            this.className += ' ' + className;
        }
        return this;
    };


})(Element)
},{}],14:[function(require,module,exports){
(function(){
	
	 /**
	 * @param  {string} src
     * @param  {function}   onSuccess
     * @param  {function}   onError
     * @return {[type]}
     */
	exports.get = function (src, onSuccess, onError) {

        var xmlhttp;

        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                if (xmlhttp.status == 200) {
                    try {
                        var parsedResponse = JSON.parse(xmlhttp.responseText);
                    } catch (e) {
                        console.log(e);
                        console.log("Be sure you have mapped bbva-intranet services in your web.xml file");
                        onError();
                    }

                    onSuccess(parsedResponse);
                } else if (xmlhttp.status == 400) {
                    console.log("Be sure you have mapped bbva-intranet services in your web.xml file");
                    onError();
                } else {
                    console.log("Be sure you have mapped bbva-intranet services in your web.xml file");
                    onError();
                }
            }
        };

        xmlhttp.open("GET", src, true);
        xmlhttp.send();

    };

})();
},{}],15:[function(require,module,exports){
(function() {
    'use strict';

    /**
     * Method that creates a DOM element
     * @param  {string} type  DOM type
     * @param  {array} attrs Pair key-value to set as attribute
     * @return {DOM element}
     */
    exports.element = function(type, attrs) {

        var element = document.createElement(type);

        if (attrs) {
            element.setAttribute(attrs[0], attrs[1]);
        }

        return element;

    };

    exports.extend = function(obj, extObj) {
        if (arguments.length > 2) {
            for (var a = 1; a < arguments.length; a++) {
                extend(obj, arguments[a]);
            }
        } else {
            for (var i in extObj) {
                obj[i] = extObj[i];
            }
        }
        return obj;
    };

    exports.indexOf = function(vector, s) {
        for (var x = 0; x < vector.length; x++)
            if (vector[x] == s) return x;
        return false;
    };

    /**
     * Function used to detect if we are in a mobile context or not
     * @return {Boolean} [description]
     */
    exports.isMobile = function() {

        var check = false;
        (function(a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;

    };

    /**
     * Function used to detect if we are in a mobile and tablet context or not
     * @return {Boolean} [description]
     */
    exports.isMobileAndTablet = function() {
        var check = false;
        (function(a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }


})();
},{}],16:[function(require,module,exports){
(function($window) {
    'use strict'

    var socialtools = require('./core/core')();

    $window.bbva = $window.bbva || {};
    $window.bbva.socialtools = $window.bbva.socialtools || {};

    socialtools.init($window.bbva.socialtools);

})(window);
},{"./core/core":8}],17:[function(require,module,exports){

},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]);

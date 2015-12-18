(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {


    module.exports = function() {

        /** @jsx React.DOM */

        /*global require, module */

        return React.createClass({
            render: function() {
                var classes = 'wr-sprite face-' + this.props.mood + '-icon';

                return ( React.createElement("li", null, " ", React.createElement("span", {className: 
                    classes
                }, " ")) );
            }
        });

    }


})();

},{}],2:[function(require,module,exports){
(function() {

    module.exports = function(properties) {

        var Component = require('../services/component.js');

        var constructor = function() {

            var FaceItemClass = require('./faceItem.js');
            var FaceItem = new FaceItemClass();

            var FeedbackFaces = React.createClass({displayName: "FeedbackFaces",
                getInitialState: function() {
                    return {
                        liked: false
                    };
                },
                handleClick: function(event) {
                    this.setState({
                        liked: !this.state.liked
                    });
                },
                render: function() {
                    var text = this.state.liked ? 'like' : 'haven\'t liked';
                    return ( React.createElement("div", {className: "feedback-container"}, 
                        React.createElement("div", null, 
                        React.createElement("span", {className: "feedback-title"}), 
                        React.createElement("ul", {className: "faces-list"}, 
                        React.createElement(FaceItem, {mood: "sad"}), 
                        React.createElement(FaceItem, {mood: "neutral"}), 
                        React.createElement(FaceItem, {mood: "happy"})
                        ), " ")
                        )
                    );
                }
            });

            return FeedbackFaces;
        };

        return new Component(constructor, properties);

    }


})();

},{"../services/component.js":7,"./faceItem.js":1}],3:[function(require,module,exports){
(function($window) {
    'use strict'

    module.exports = function(properties) {

        var display = require('../services/display')();

        /**
         * Config Class that provides methods to configure
         * the HPD-Mobile library
         * @param {object} properties
         */
        var Config = function() {


            /** @type {object} Object used to load external libraries in synch mode */
            this.librariesLoader = require('./librariesLoader')(properties);

            /**
             * Constructor of Config object.
             * @return {[type]} [description]
             */
            function __init__() {

                /** We have to set the environment and the remote connector to bbva-intranet */

                var cssUrl = properties.config.css.url;
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

        return new Config();

    }


})(window);

},{"../services/display":9,"./librariesLoader":4}],4:[function(require,module,exports){
(function($window) {
    'use strict'

    module.exports = function(properties) {

        /** @type {object} Helper library with http methods */
        var http = require('../utils/http');

        /**
         * Libraries Loader class to load asynchrously js libraries before to start the application.
         * @param {Function}
         */
        var LibrariesLoader = function() {

            this.libraries = [];

        };


        /**
         * Library to add to the list of libraries to load
         * @param {[type]} src       [source to the library]
         * @param {[type]} onSuccess [onSuccess callback]
         */
        LibrariesLoader.prototype.addLibrary = function(src, onSuccess, onError) {

            if (typeof src == 'undefined') {
                return;
            }

            var library = {
                src: src,
                script: null,
                loaded: false
            };

            library.script = document.createElement('script');
            library.script.onload = this.onLoad.bind(this, library, onSuccess, onError);
            library.script.src = library.src;
            document.getElementsByTagName('head')[0].appendChild(library.script);
            this.libraries.push(library);
        }

        /**
         * Function called when all libraries have been loaded. Furthermore, we have to be sure
         * that "external/session" has been loaded too. In case it fails, we have to call onError
         * @param  {[type]} onSuccess [description]
         * @return {[type]}           [description]
         */
        LibrariesLoader.prototype.onLoad = function(library, onSuccess, onError) {

            var i,
                allLoaded = true;

            library.loaded = true;

            for (i = 0; i < this.libraries.length; i++) {
                if (!this.libraries[i].loaded) {
                    allLoaded = false;
                }
            }

            if (allLoaded) {

                onSuccess();

                //onError();

            }
        }

        /**
         * @param  {string array} libraries [asynchronous js resources to load before HPD Angular Bootstrapping]
         * @return {[type]}
         */
        LibrariesLoader.prototype.loadLibraries = function(libraries, onSuccess, onError, synchronusly) {

            var libraries = libraries.slice();

            if (!synchronusly) {
                if (libraries && libraries.length > 0) {
                    var i;
                    for (i = 0; i < libraries.length; i++) {
                        this.addLibrary(libraries[i], onSuccess, onError);
                    }
                }
            } else {

                recursiveLoad.call(this, onSuccess);

                function recursiveLoad(onSuccess) {
                    if (libraries.length > 0) {
                        this.addLibrary(libraries[0], function() {
                            libraries.splice(0, 1);
                            recursiveLoad.call(this, onSuccess);
                        }.bind(this))
                    } else {
                        onSuccess();
                    }
                }
            }

        }

        return new LibrariesLoader();

    }


})(window);

},{"../utils/http":10}],5:[function(require,module,exports){
(function($window) {
    'use strict';


    exports.config = {
        libraries: {
            react: [
                "https://cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react.js",
                "https://cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react-dom.js"
            ]
        },
        css: {
            url: "https://storage.googleapis.com/bbva-front.appspot.com/hpd.mobile/version/1.0.0/main.css"
        }
    };


})(window);

},{}],6:[function(require,module,exports){
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
},{"./config/config":3,"./config/properties":5,"./services/components":8,"./utils/utils":11}],7:[function(require,module,exports){
(function() {
    'use strict'

    module.exports = function(constructorClass, properties) {

        function Component(constructorClass) {

            this.constructor = constructorClass;

        };

        Component.prototype.render = function(id_selector) {

            if (properties.reactLoaded) {
                this.react = new this.constructor();
                ReactDOM.render(React.createElement(this.react), document.getElementById(id_selector));
            } else {
                document.addEventListener('reactLoaded', function() {
                    this.react = new this.constructor();
                    ReactDOM.render(React.createElement(this.react), document.getElementById(id_selector));
                }.bind(this))
            }


        }

        return new Component(constructorClass);

    }

})();

},{}],8:[function(require,module,exports){
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

},{"../components/feedbackFaces":2}],9:[function(require,module,exports){
(function($window) {
    'use strict'

    module.exports = function() {

        function Display() {

            this.body = document.body;

        }

        /**
         * Inject to hosted application hpd-mobile styles
         * @param  {string} url [description]
         * @return {[type]}     [description]
         */
        Display.prototype.loadCSS = function(url) {
            var link = document.createElement('link')
            link.setAttribute('rel', 'stylesheet')
            link.setAttribute('type', 'text/css')
            link.setAttribute('href', url)
            document.getElementsByTagName('head')[0].appendChild(link);
        }

        return new Display();
    }

})(window);

},{}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
(function() {
    'use strict';

    exports.capitalize = function(s) {
        return s.replace(/(^|\s)([a-z])/g, function(m, p1, p2) {
            return p1 + p2.toUpperCase();
        });
    };

    exports.replaceAccents = function(s) {
        return s.replace(/á/g, "a").replace(/é/g, "e").replace(/í/g, "i").replace(/ó/g, "o").replace(/ú/g, "u")
            .replace(/Á/g, "A").replace(/É/g, "E").replace(/Í/g, "I").replace(/Ó/g, "O").replace(/Ú/g, "U");
    };

    //Funcion para codificar una cadena en formato hexadecimal
    exports.a2hex = function(str) {
        var result = "";
        if (str) {
            for (var i = 0; i < str.length; i++) {
                result += str.charCodeAt(i).toString(16);
            }
        }

        //comprimimos la cadena hex para reducir su tamaño
        result = exports.compress_hex(result);
        return result;
    };

    //Funcion para decodificar una cadena en formato hexadecimal
    exports.hex2a = function(hex) {
        var result = "";
        if (hex) {
            //descomprimimos la cadena hexadecimal
            hex = exports.decompress_hex(hex);
            for (var i = 0; i < hex.length; i += 2) {
                result += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
            }
        }
        return result;
    };

    //funciones para reducir longitud de cadena url en hexadecimal
    exports.compress_hex = function(cadena) {

        var buffer = '';
        var inputCadena = new Array();
        var aux;
        var dictionary = ['G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

        inputCadena = cadena.split("");
        while (inputCadena.length > 2) {
            aux = inputCadena.shift() + '' + inputCadena.shift();
            if (aux > 50 && aux < 92) {
                buffer = buffer + '' + dictionary[aux - 51];
            } else {
                buffer = buffer + '' + aux;
            }
        }
        while (inputCadena.length > 0) {
            buffer = buffer + inputCadena.shift();
        }

        return buffer;

    };

    exports.decompress_hex = function(cadena) {

        var buffer = '';
        var inputCadena = new Array();
        var indiceAux;
        var aux;
        var dictionary = ['G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

        inputCadena = cadena.split("");

        while (inputCadena.length) {
            aux = inputCadena.shift();
            indiceAux = exports.indexOf(dictionary, aux);
            if (typeof indiceAux === "number") {
                buffer = buffer + '' + (indiceAux + 51);
            } else {
                buffer = buffer + '' + aux;
            }
        }

        return buffer;

    };

    exports.indexOf = function(vector, s) {
        for (var x = 0; x < vector.length; x++)
            if (vector[x] == s) return x;
        return false;
    };

    /*
     * Calcula si la url está contenida en un "javascript:window.open" para su apertura en una nueva ventana
     * @param url
     * @return {
     *    url: url interna del window.open
     *    external: true si la url contiene "javascript:window.open"
     * }
     */
    exports.externalUrl = function(s) {

        if (s.indexOf("javascript:window.open") == 0) {
            return {
                external: true,
                url: s.substring(s.indexOf("http"), s.indexOf("','"))
            }
        } else {
            return {
                external: false,
                url: s
            }
        }
    };

    exports.isLetter = function(s) {
        return s && s.length === 1 && exports.replaceAccents(s).match(/[a-z,ñ]/i);
    };

    exports.isIpad = function(s) {
        return navigator.userAgent.match(/iPad/i) != null;
    };

    exports.camelToDash = function(s) {
        return s.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1-$2');
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
},{}],12:[function(require,module,exports){
(function($window) {
    'use strict'

    var socialtools = require('./core/core')();

    $window.bbva = $window.bbva || {};
    $window.bbva.socialtools = $window.bbva.socialtools || {};

    socialtools.init($window.bbva.socialtools);

})(window);
},{"./core/core":6}],13:[function(require,module,exports){

},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13]);

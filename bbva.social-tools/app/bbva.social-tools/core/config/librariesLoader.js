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

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

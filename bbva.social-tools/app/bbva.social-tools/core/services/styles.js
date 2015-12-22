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
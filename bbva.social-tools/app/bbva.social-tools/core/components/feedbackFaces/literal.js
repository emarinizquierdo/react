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
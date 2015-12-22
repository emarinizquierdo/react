(function() {

    module.exports = function(properties, lang) {

        var utils = require('../../utils/utils');
        var Literal = require('../literal')(properties, lang);

        function Error() {

            this.element = new utils.element('div', ['class', 'error-container']);

            __init__.call(this);
        }

        function __init__() {

            this.literal = new Literal();

            this.element.stAddClass('hide');
            this.errorTextWrapper = this.element.appendChild(new utils.element('div', ['class', 'error-text-wrapper']));
            this.errorText = this.errorTextWrapper.appendChild(this.literal.element);
            this.errorText.stAddClass('error-text');

        }

        Error.prototype.showError = function( text, keep) {

            this.element.stRemoveClass('hide');
            this.literal.setText(text);

            if(!keep){
	            setTimeout(function(){
	            	this.element.stAddClass('hide');
	            }.bind(this), 3000);
	        }

        };

        return Error;

    }

})();
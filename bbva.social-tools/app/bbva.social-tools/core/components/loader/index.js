(function() {

    var utils = require('../../utils/utils');

    function Loader() {

        this.element = new utils.element('div', ['class', 'activity-indicator']);

        __init__.call(this);
    }

    function __init__() {
        
        this.spinWrapper = this.element.appendChild(new utils.element('div', ['class', 'spin-wrapper']));
        this.spin = this.spinWrapper.appendChild(new utils.element('span', ['class', 'wr-sprite spinner spin']));

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
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
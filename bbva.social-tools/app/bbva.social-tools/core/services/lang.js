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
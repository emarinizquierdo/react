(function() {
    'use strict';

    exports.config = {
        css: [
        	//"http://localhost:8080/app/bbva.social-tools/css/feedback-faces.css", //localhost
            "https://storage.googleapis.com/bbva-front.appspot.com/bbva.socialtools/1.0.0/css/feedback-faces.css"
        ]
    };

    exports.events = {
        LANG_CHANGED: "bbva.socialtools.langChanged"
    };

})();
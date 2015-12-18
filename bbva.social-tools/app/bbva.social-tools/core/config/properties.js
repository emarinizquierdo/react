(function($window) {
    'use strict';


    exports.config = {
        libraries: {
            react: [
                "https://cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react.js",
                "https://cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react-dom.js"
            ]
        },
        angular: {
            moduleNames: {
                FEEDBACK_FACES: 'social-tools.feedbackFaces'
            }
        },
        css: {
            url: "https://storage.googleapis.com/bbva-front.appspot.com/hpd.mobile/version/1.0.0/main.css"
        }
    };

    exports.data = {};


})(window);
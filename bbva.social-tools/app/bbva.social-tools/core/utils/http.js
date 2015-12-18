(function(){
	
	 /**
	 * @param  {string} src
     * @param  {function}   onSuccess
     * @param  {function}   onError
     * @return {[type]}
     */
	exports.get = function (src, onSuccess, onError) {

        var xmlhttp;

        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                if (xmlhttp.status == 200) {
                    try {
                        var parsedResponse = JSON.parse(xmlhttp.responseText);
                    } catch (e) {
                        console.log(e);
                        console.log("Be sure you have mapped bbva-intranet services in your web.xml file");
                        onError();
                    }

                    onSuccess(parsedResponse);
                } else if (xmlhttp.status == 400) {
                    console.log("Be sure you have mapped bbva-intranet services in your web.xml file");
                    onError();
                } else {
                    console.log("Be sure you have mapped bbva-intranet services in your web.xml file");
                    onError();
                }
            }
        };

        xmlhttp.open("GET", src, true);
        xmlhttp.send();

    };

})();
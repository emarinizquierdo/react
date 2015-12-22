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
                    try{
                        var parsed = JSON.parse(xmlhttp.responseText);
                        onSuccess(parsed);
                    }catch(e){
                        console.log("xmlhttp error")
                        onError();
                    }
                } else {
                    console.log("xmlhttp error")
                    onError();
                }
            }
        };

        xmlhttp.open("GET", src, true);
        xmlhttp.send();

    };

})();
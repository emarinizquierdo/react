(function() {
    'use strict';


    /**
     * Function to observe gps changes.
     * @param  {[type]} onChange [description]
     * @return {[type]}          [description]
     */
    exports.watch = function(onChange) {

        var gps = {};

        var geoSuccess = function(data) {

            if (data && data.coords) {
                gps.accuracy = data.coords.accuracy;
                gps.altitude = data.coords.altitude;
                gps.altitudeAccuracy = data.coords.altitudeAccuracy;
                gps.heading = data.coords.heading;
                gps.latitude = data.coords.latitude;
                gps.longitude = data.coords.longitude;
                gps.speed = data.coords.speed;
            }

            onChange(gps);
        };

        var geoError = function() {
            console.log("Sorry, no position available.");
            onChange(gps);
        };

        if (navigator.geolocation) {

            var geoOptions = {
                enableHighAccuracy: true,
                maximumAge: 30000,
                timeout: 10000
            };

            navigator.geolocation.watchPosition(geoSuccess, geoError, geoOptions);

        } else {
            onChange(gps);
        }
    }


})();
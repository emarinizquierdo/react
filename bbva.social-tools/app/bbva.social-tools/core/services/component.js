(function() {
    'use strict'


        function Component(constructorClass) {

            this.constructor = constructorClass;

        };

        Component.prototype.render = function(selector_id) {

            this.instance = new this.constructor(selector_id);
            
        }

        module.exports = Component;


})();
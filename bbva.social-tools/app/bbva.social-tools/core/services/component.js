(function() {
    'use strict'

    module.exports = function(constructorClass, properties) {

        function Component(constructorClass) {

            this.constructor = constructorClass;

        };

        Component.prototype.render = function(id_selector) {

            if (properties.reactLoaded) {
                this.react = new this.constructor();
                ReactDOM.render(React.createElement(this.react), document.getElementById(id_selector));
            } else {
                document.addEventListener('reactLoaded', function() {
                    this.react = new this.constructor();
                    ReactDOM.render(React.createElement(this.react), document.getElementById(id_selector));
                }.bind(this))
            }


        }

        return new Component(constructorClass);

    }

})();

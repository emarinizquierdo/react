(function() {


    module.exports = function() {

        /** @jsx React.DOM */

        /*global require, module */

        return React.createClass({
            render: function() {
                var classes = 'wr-sprite face-' + this.props.mood + '-icon';

                return ( < li > < span className = {
                    classes
                } > < /span></li > );
            }
        });

    }


})();

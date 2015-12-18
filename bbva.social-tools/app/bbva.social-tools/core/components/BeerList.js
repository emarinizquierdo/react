(function() {

    module.exports = function() {

        var BeerItem = require('./BeerItem.js');
        var beerItem = new BeerItem();

        return React.createClass({
                getInitialState: function() {
                    return {
                        clickCount: 0
                    };
                },
                handleClick: function() {
                    this.setState(function(state) {
                        return {
                            clickCount: state.clickCount + 1
                        };
                    });
                },
                render: function() {
                    return ( < h2 onClick = {
                            this.handleClick
                        } > Click me!Number of clicks: {
                            this.state.clickCount
                        } < /h2>);
                    }
                });

        }
    }

})();
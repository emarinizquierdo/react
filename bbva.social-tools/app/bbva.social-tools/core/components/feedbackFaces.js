(function() {

    module.exports = function(properties) {

        var Component = require('../services/component.js');

        var constructor = function() {

            var FaceItemClass = require('./faceItem.js');
            var FaceItem = new FaceItemClass();

            var FeedbackFaces = React.createClass({
                getInitialState: function() {
                    return {
                        liked: false
                    };
                },
                handleClick: function(event) {
                    this.setState({
                        liked: !this.state.liked
                    });
                },
                render: function() {
                    var text = this.state.liked ? 'like' : 'haven\'t liked';
                    return ( < div className = "feedback-container" >
                        < div >
                        < span className="feedback-title" />
                        < ul className="faces-list" >
                        < FaceItem mood="sad" />
                        < FaceItem mood="neutral" />
                        < FaceItem mood="happy" />
                        < /ul> < /div >
                        < /div>
                    );
                }
            });

            return FeedbackFaces;
        };

        return new Component(constructor, properties);

    }


})();

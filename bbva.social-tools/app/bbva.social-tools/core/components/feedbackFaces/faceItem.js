(function() {

        var utils = require('../../utils/utils');
        
        var ACTIVE_CLASS = 'active',
            LOCKED_CLASS = 'locked';

        function FaceItem( mood ) {

            this.element = new utils.element('li');
            this.spanElement;
            this.active = false;
            this.locked = true;

            __init__.call(this, mood);

        }

        function __init__( mood ){

            this.spanElement = new utils.element('span', ['class', 'wr-sprite']);
            this.spanElement.stAddClass(' face-' + mood + '-icon');
            this.spanElement.stAddClass(LOCKED_CLASS);
            this.element.appendChild(this.spanElement);

            setUserInteraction.call(this);

        }

        /**
         * Method to set active a faces. It will be only active if it is not locked.
         * If active parameter is not passed, it will return active status
         * @param {boolean} active [description]
         */
        FaceItem.prototype.setActive = function( active ){

            if(typeof active === "undefined"){
                return this.active;
            }else{
                this.active = active;
                if(active){
                    this.spanElement.stAddClass( ACTIVE_CLASS );
                }else{
                    this.spanElement.stRemoveClass( ACTIVE_CLASS );
                }
            }
        };

        /**
         * Method that locks a face interaction and styles
         * @param  {boolean} lock [description]
         * @return {[type]}      [description]
         */
        FaceItem.prototype.lock = function ( lock ){

            if(typeof lock === "undefined"){
                return this.locked;
            }else{
                this.locked = lock;
                if(lock){
                    this.spanElement.stAddClass( LOCKED_CLASS );
                }else{
                    this.spanElement.stRemoveClass( LOCKED_CLASS );
                }
                setUserInteraction.call(this, lock);
            }

        };

        FaceItem.prototype.setOnClick = function( onClickFunction ){
            this.onClick = onClickFunction;
        }

        function setUserInteraction( bind ){

            this.spanElement.onclick= (!bind) ? function(){

                this.onClick(this.active);

            }.bind(this) : null;

        }

        module.exports = FaceItem;


})();
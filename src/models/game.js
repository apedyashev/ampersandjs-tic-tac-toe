var AmpersandModel = require('ampersand-model');
import {AmpersandPlayer}  from '../game_core/AmpersandPlayer'

module.exports = AmpersandModel.extend({
    dataTypes : {
        ampersandPlayer : {
            // set called every time someone tried to set a property of this datatype
            set : function(newVal) {
                if(newVal instanceof AmpersandPlayer) {
                    return {
                        val : newVal,
                        type : 'ampersandPlayer'
                    };
                }
                try {
                    // try to parse it from passed in value:
                    var player = new AmpersandPlayer(newVal._brush, newVal._user);

                    return {
                        val : player,
                        type : 'ampersandPlayer'
                    };
                }
                catch(parseError) {
                    // return the value with what we think its type is
                    return {
                        val : newVal,
                        type : typeof newVal
                    };
                }
            }
        }

    },
    props: {
        leftSideUser: 'ampersandPlayer',
        rightSideUser: 'ampersandPlayer',
        isGameOver: ['boolean', false, false]
    },

    initialize: function() {
        this.leftSideUser.model.on('change:name', () => {
            let leftSideUserName = this.leftSideUser.model.get('name'),
                rightSideUSerName = this.rightSideUser.model.get('name');
            if (leftSideUserName && (leftSideUserName.toUpperCase() === rightSideUSerName.toUpperCase())) {
                this.leftSideUser.model.set('name', leftSideUserName + ' #1');
            }
        });

        this.rightSideUser.model.on('change:name', () => {
            let leftSideUserName = this.leftSideUser.model.get('name'),
                rightSideUSerName = this.rightSideUser.model.get('name');
            if (rightSideUSerName && (leftSideUserName.toUpperCase() === rightSideUSerName.toUpperCase())) {
                this.rightSideUser.model.set('name', rightSideUSerName + ' #1');
            }
        });
    }
});

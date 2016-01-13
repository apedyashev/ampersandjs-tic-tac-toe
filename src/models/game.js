import AmpersandModel  from 'ampersand-model'
import AmpersandPlayer  from '../game_core/ampersand-player'
import CrossBrush  from '../game_core/cross-brush'
import NoughtBrush  from '../game_core/nought-brush'

/**
 * Model that stores game data (players and finished/unfinished state) See {@link https://ampersandjs.com/docs/#ampersand-model}
 */
const GameModel = AmpersandModel.extend({
    dataTypes: {
        ampersandPlayer: {
            // set called every time someone tried to set a property of this datatype
            set: function(newVal) {
                if (newVal instanceof AmpersandPlayer) {
                    return {
                        val: newVal,
                        type: 'ampersandPlayer'
                    };
                }
                try {
                    // try to parse it from passed in value:
                    const brush = (newVal._user.symbol == 'nought') ? new NoughtBrush(newVal._brush._color) : new CrossBrush(newVal._brush._color),
                        player = new AmpersandPlayer(brush, newVal._user);

                    return {
                        val: player,
                        type: 'ampersandPlayer'
                    };
                }
                catch (parseError) {
                    // return the value with what we think its type is
                    return {
                        val: newVal,
                        type: typeof newVal
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

    derived: {
        isThereWinner: {
            deps: ['isGameOver'],
            fn: function() {
                return this.isGameOver && (this.leftSideUser.model.isWon || this.rightSideUser.model.isWon);
            }
        }
    },

    initialize: function() {
        this.leftSideUser.model.on('change:name', () => {
            const leftSideUserName = this.leftSideUser.model.get('name'),
                rightSideUserName = this.rightSideUser.model.get('name');
            if (leftSideUserName && (leftSideUserName.toUpperCase() === rightSideUserName.toUpperCase())) {
                this.leftSideUser.model.set('name', leftSideUserName + ' #1');
            }
        });

        this.rightSideUser.model.on('change:name', () => {
            const leftSideUserName = this.leftSideUser.model.get('name'),
                rightSideUserName = this.rightSideUser.model.get('name');
            if (rightSideUserName && (leftSideUserName.toUpperCase() === rightSideUserName.toUpperCase())) {
                this.rightSideUser.model.set('name', rightSideUserName + ' #1');
            }
        });
    }
});
export default GameModel

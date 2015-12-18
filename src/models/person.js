var AmpersandModel = require('ampersand-model');


let Person = AmpersandModel.extend({
    props: {
        id: 'any',
        name: ['string', true, ''],
        isWon: ['boolean', false, false],
        isMyTurn: ['boolean', false, false],
        symbol: 'string'
    },
    derived: {
        isInitialized: {
            deps: ['name'],
            fn: function() {
                return !!this.name;
            }
        },
        isNotInitialized: {
            deps: ['name'],
            fn: function() {
                return !this.name;
            }
        },
        fullInfo: {
            deps: ['name', 'isWon', 'symbol'],
            fn: function() {
                let info = '';
                if (this.symbol == 'nought') {
                    info += 'O ';
                }
                else if (this.symbol == 'cross') {
                    info += 'X ';
                }
                info += this.name;

                if (this.isWon) {
                    info += ' [WINNER]';
                }
                return info;
            }
        }
    }
});

export {Person}

import AmpersandModel  from 'ampersand-model'

export default AmpersandModel.extend({
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
            deps: ['name', 'isWon'],
            fn: function() {
                let info = '';
                info += this.name;

                if (this.isWon) {
                    info += ' [WINNER]';
                }
                return info;
            }
        }
    }
});

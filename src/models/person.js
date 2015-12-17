var AmpersandModel = require('ampersand-model');


let Person = AmpersandModel.extend({
    props: {
        id: 'any',
        name: ['string', true, ''],
        isWon: ['boolean', false, false],
        isMyTurn: ['boolean', false, false]
    },
    //session: {
    //    selected: ['boolean', true, false]
    //},
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
        }
    }
    //    fullName: {
    //        deps: ['firstName', 'lastName'],
    //        fn: function () {
    //            return this.firstName + ' ' + this.lastName;
    //        }
    //    },
    //    avatar: {
    //        deps: ['firstName', 'lastName'],
    //        fn: function () {
    //            return 'http://robohash.org/' + encodeURIComponent(this.fullName) + '?size=80x80';
    //        }
    //    },
    //    editUrl: {
    //        deps: ['id'],
    //        fn: function () {
    //            return '/person/' + this.id + '/edit';
    //        }
    //    },
    //    viewUrl: {
    //        deps: ['id'],
    //        fn: function () {
    //            return '/person/' + this.id;
    //        }
    //    }
    //}
});

export {Person}

var PageView = require('./base');
var templates = require('../templates');
var FinishedGameView = require('../views/finished-game');


module.exports = PageView.extend({
    pageTitle: 'collection demo',
    template: templates['pages/past-games'],
    bindings: {
        'collection.length': {
            type: 'booleanClass',
            hook: 'collection-is-empty',
            yes: 'hide',
            no: ''
        }
    },
    render: function () {
        this.renderWithTemplate();
        this.renderCollection(this.collection, FinishedGameView, this.queryByHook('past-games-list'));
    }
});

import View from 'ampersand-view'
import FinishedGameView from '../views/finished-game'

const templates = require('../templates');

export default View.extend({
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
    render: function() {
        this.renderWithTemplate();
        this.renderCollection(this.collection, FinishedGameView, this.queryByHook('past-games-list'));
    }
});

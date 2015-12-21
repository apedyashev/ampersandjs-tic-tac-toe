import View from 'ampersand-view'
import FinishedGameView from '../views/finished-game'

const templates = require('../templates');

/**
 * Paste games (leaderboard) page view. See {@link https://ampersandjs.com/docs/#ampersand-view}
 */
const PastGamesView = View.extend({
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

        return this;
    }
});
export default PastGamesView

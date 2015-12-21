import app from 'ampersand-app'
import _ from 'lodash'
import View from 'ampersand-view'
import UserPanelView from '../views/user-panel'
import AmpersandPlayer from '../game_core/ampersand-player'
import NoughtBrush from '../game_core/nought-brush'
import CrossBrush from '../game_core/cross-brush'

const templates = require('../templates');

/**
 * Home page view. See {@link https://ampersandjs.com/docs/#ampersand-view}
 */
const HomePageView = View.extend({
    pageTitle: 'home',
    template: templates['pages/home'],
    events: {
        'click [data-hook~=new-game]': 'startNewGame'
    },
    bindings: {
        'model.isGameOver': {
            type: 'booleanClass',
            hook: 'show-if-game-is-over',
            yes: '',
            no: 'hide'
        }
    },
    initialize: function(options) {
        this.board = options.board;
        this.model.on('change:leftSideUser', _.bind(this.render, this));
        this.model.on('change:rightSideUser', _.bind(this.render, this));
    },
    render: function() {
        this.renderWithTemplate();

        this.renderSubview(new UserPanelView({
            model: this.model.leftSideUser.model
        }), '#left-player');

        this.renderSubview(new UserPanelView({
            model: this.model.rightSideUser.model
        }), '#right-player');

        if (this.board) {
            this.board.canvas = this.query('canvas#game-board');
            this.board.draw(true);
        }
    },

    startNewGame: function() {
        this.model.set('leftSideUser', new AmpersandPlayer(new NoughtBrush(app.noughtsColor), {'symbol': 'nought'}));
        this.model.set('rightSideUser', new AmpersandPlayer(new CrossBrush(), {'symbol': 'cross'}));
        app.createNewGame(this.model.get('leftSideUser'), this.model.get('rightSideUser'));
        this.render();
    }
});
export default HomePageView

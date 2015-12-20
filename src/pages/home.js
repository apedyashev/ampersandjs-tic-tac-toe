var PageView = require('./base');
var templates = require('../templates');
var $ = require('jquery');
var UserPanelView = require('../views/user-panel');
var app = require('ampersand-app');
var _ = require('lodash');

import {AmpersandPlayer} from '../game_core/AmpersandPlayer';
import {NoughtBrush} from '../game_core/NoughtBrush';
import {CrossBrush} from '../game_core/CrossBrush';

module.exports = PageView.extend({
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
    render: function () {
        this.renderWithTemplate();

        this.renderSubview(new UserPanelView({
            model: this.model.leftSideUser.model
        }), '#left-player');

        this.renderSubview(new UserPanelView({
            model: this.model.rightSideUser.model
        }), '#right-player');

        if (this.board) {
            this.board.canvas = this.query('canvas#game-board');
            this.board.draw();
        }
    },

    startNewGame: function() {
        this.model.set('leftSideUser', new AmpersandPlayer(new NoughtBrush(app.noughtsColor), {'symbol': 'nought'}));
        this.model.set('rightSideUser', new AmpersandPlayer(new CrossBrush(), {'symbol': 'cross'}));
        app.createNewGame(this.model.get('leftSideUser'), this.model.get('rightSideUser'));
        this.render();
    }
});

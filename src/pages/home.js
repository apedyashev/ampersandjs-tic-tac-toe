var PageView = require('./base');
var templates = require('../templates');
var $ = require('jquery');
var UserPanelView = require('../views/user-panel');
//var app = require('ampersand-app');

module.exports = PageView.extend({
    pageTitle: 'home',
    template: templates['pages/home'],
    //bindings: {
    //    'model.avatar': {
    //        type: 'attribute',
    //        hook: 'avatar',
    //        name: 'src'
    //    }
    //},
    subviews: {
        leftUser: {
            container: '#left-player',
            waitFor: 'model.leftSideUser',
            prepareView: function (el) {
                return new UserPanelView({
                    el: el,
                    model: this.model.leftSideUser.model
                });
            }
        },
        rightUser: {
            container: '#right-player',
            waitFor: 'model.rightSideUser',
            prepareView: function (el) {
                return new UserPanelView({
                    el: el,
                    model: this.model.rightSideUser.model
                });
            }
        }
    },
    initialize: function(options) {
        this.board = options.board;
    },
    render: function () {
        this.renderWithTemplate();

        //this.renderSubview(new UserPanelView({
        //    model: model
        //}), '#left-player');

        if (this.board) {
            this.board.canvas = this.query('canvas#game-board');
            this.board.draw();
        }
    }
});

var app = require('ampersand-app');
var Router = require('ampersand-router');
var HomePage = require('./pages/home');
var PostGamesPage = require('./pages/past-games');


module.exports = Router.extend({
    routes: {
        '': 'home',
        'past-games(/)': 'pastGames',
        'info': 'info',
        'person/add': 'personAdd',
        'person/:id': 'personView',
        'person/:id/edit': 'personEdit',
        '(*path)': 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    home: function() {
        app.trigger('page', new HomePage({
            model: app.gameModel,
            board: app.board
        }));
    },

    pastGames: function() {
        app.trigger('page', new PostGamesPage({
            collection: app.games
        }));
    },

    catchAll: function() {
        console.log('catchAll');
        this.redirectTo('');
    }
});

import app from 'ampersand-app'
import Router from 'ampersand-router'
import HomePage from './pages/home'
import PastGamesPage from './pages/past-games'

export default Router.extend({
    routes: {
        '': 'home',
        'past-games(/)': 'pastGames',
        'info': 'info',
        'person/add': 'personAdd',
        'person/:id': 'personView',
        'person/:id/edit': 'personEdit',
        '(*path)': 'catchAll'
    },

    home: function() {
        app.trigger('page', new HomePage({
            model: app.gameModel,
            board: app.board
        }));
    },

    pastGames: function() {
        app.trigger('page', new PastGamesPage({
            collection: app.games
        }));
    },

    catchAll: function() {
        console.log('catchAll');
        this.redirectTo('');
    }
});

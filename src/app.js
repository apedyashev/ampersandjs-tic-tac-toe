var app = require('ampersand-app');
var _ = require('lodash');
var config = require('clientconfig');
var Router = require('./router');
var MainView = require('./views/main');
var Me = require('./models/me');
// TODO: get rid of it
var People = require('./models/persons');
var Games = require('./collections/games');
var domReady = require('domready');
var $ = require('jquery');

var GameModel = require('./models/game');


// attach our app to `window` so we can
// easily access it from the console.
window.app = app;
import {GameBoard} from './game_core/GameBoard';
import {AmpersandPlayer} from './game_core/AmpersandPlayer';
import {NoughtBrush} from './game_core/NoughtBrush';
import {CrossBrush} from './game_core/CrossBrush';

// Extends our main app singleton
app.extend({
    me: new Me(),
    people: new People(),
    games: new Games(),
    router: new Router(),
    gameModel: new GameModel({
        leftSideUser: new AmpersandPlayer(new NoughtBrush()),
        rightSideUser: new AmpersandPlayer(new CrossBrush())
    }),
    board: new GameBoard({
        width: 300,
        height: 300
    }),
    // This is where it all starts
    init: function() {
        // Create and attach our main view
        this.mainView = new MainView({
            model: this.me,
            el: document.body
        });

        // this kicks off our backbutton tracking (browser history)
        // and will cause the first matching handler in the router
        // to fire.
        this.router.history.start({ pushState: true });

        this.createNewGame();
        //this.board.noughtsPlayer = this.gameModel.get('leftSideUser');
        //this.board.crossesPlayer = this.gameModel.get('rightSideUser');
        //this.board.initGame();
        //
        //this.games.add(this.gameModel);
    },
    createNewGame: function() {
        this.board.noughtsPlayer = this.gameModel.get('leftSideUser');
        this.board.crossesPlayer = this.gameModel.get('rightSideUser');
        this.board.initGame();

        let addGameToLeaderBaoard = function(model, value) {
            if (value) {
                let game = new GameModel({
                    leftSideUser: this.gameModel.get('leftSideUser'),
                    rightSideUser: this.gameModel.get('rightSideUser')
                });
                this.games.add(game);
            }
        };
        this.board.noughtsPlayer.model.on('change:isWon', _.bind(addGameToLeaderBaoard, this));
        this.board.crossesPlayer.model.on('change:isWon', _.bind(addGameToLeaderBaoard, this));
    },
    // This is a helper for navigating around the app.
    // this gets called by a global click handler that handles
    // all the <a> tags in the app.
    // it expects a url pathname for example: "/costello/settings"
    navigate: function(page) {
        var url = (page.charAt(0) === '/') ? page.slice(1) : page;
        this.router.history.navigate(url, {
            trigger: true
        });
    }
});

// run it on domReady
domReady(_.bind(app.init, app));

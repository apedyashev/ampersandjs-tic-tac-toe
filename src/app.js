import app from 'ampersand-app'
import _ from 'lodash'
import domReady from 'domready'
import AppRouter from './router'
import GamesCollection from './collections/games'
import MainView from './views/main'
import GameModel from './models/game'
import GameBoard from './game_core/game-board'
import AmpersandPlayer from './game_core/ampersand-player'
import NoughtBrush from './game_core/nought-brush'
import CrossBrush from './game_core/cross-brush'

// Extends our main app singleton
app.extend({
    games: new GamesCollection(),
    router: new AppRouter(),
    noughtsColor: '#006398',
    gameModel: new GameModel({
        leftSideUser: new AmpersandPlayer(new NoughtBrush(), {symbol: 'nought'}),
        rightSideUser: new AmpersandPlayer(new CrossBrush(), {symbol: 'cross'})
    }),
    board: new GameBoard({
        width: 360,
        height: 360
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
        this.router.history.start({
            pushState: true
        });

        this.gameModel.get('leftSideUser').brushColor = this.noughtsColor;
        this.createNewGame(this.gameModel.get('leftSideUser'), this.gameModel.get('rightSideUser'));
    },
    createNewGame: function(leftSideUser, rightSideUser) {
        this.board.noughtsPlayer = leftSideUser;
        this.board.crossesPlayer = rightSideUser;
        this.gameModel.set('isGameOver', false);
        this.board.initGame();

        const addGameToLeaderBaoard = () => {
            const game = new GameModel({
                leftSideUser: this.gameModel.get('leftSideUser'),
                rightSideUser: this.gameModel.get('rightSideUser')
            });
            this.gameModel.set('isGameOver', true);
            this.games.add(game);
        };
        this.board.gameOverCallback = (winner) => {
            if (winner) {
                addGameToLeaderBaoard();
            }
            else {
                this.gameModel.set('isGameOver', true);
            }
        };
    },
    // This is a helper for navigating around the app.
    // this gets called by a global click handler that handles
    // all the <a> tags in the app.
    // it expects a url pathname for example: "/costello/settings"
    navigate: function(page) {
        const url = (page.charAt(0) === '/') ? page.slice(1) : page;
        this.router.history.navigate(url, {
            trigger: true
        });
    }
});

// run it on domReady
domReady(_.bind(app.init, app));

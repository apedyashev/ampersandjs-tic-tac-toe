import HomePageView from '../../src/pages/home'
import GameModel from '../../src/models/game'
import GameBoard from '../../src/game_core/game-board'
import AmpersandPlayer from '../../src/game_core/ampersand-player'
import NoughtBrush from '../../src/game_core/nought-brush'
import CrossBrush from '../../src/game_core/cross-brush'
import app from 'ampersand-app'

describe('The HomePage view', function() {
    beforeEach(function() {
        this.gameModel = new GameModel({
            leftSideUser: new AmpersandPlayer(new NoughtBrush(), {symbol: 'nought'}),
            rightSideUser: new AmpersandPlayer(new CrossBrush(), {symbol: 'cross'})
        });
        this.gameBoard = new GameBoard({
            width: 360,
            height: 360
        });
        this.gameBoard.noughtsPlayer = this.gameModel.leftSideUser;
        this.gameBoard.crossesPlayer = this.gameModel.rightSideUser;
        this.home = new HomePageView({
            model: this.gameModel,
            board: app.board
        });
    });

    afterEach(function() {
        this.home = null;
        this.gameModel = null;
        this.gameBoard = null;
    });

    it('is a view', function() {
        expect(this.home.cid).toBeDefined();
        expect(this.home.cid).toContain("view");
    });

    it('renders correct template', function() {
        expect(this.home.render().el.innerHTML).toContain('Welcome to Tic-Tac-Toe game written in AmpersandJS');
    });

    it('ask left-side user for his name', function() {
        expect(this.home.render().query('#left-player .panel-title').innerText).toContain('Please eneter your name');
    });

    it('ask right-side user for his name', function() {
        expect(this.home.render().query('#right-player .panel-title').innerText).toContain('Please eneter your name');
    });

    it('reflects name set on gameModel user in left panel', function() {
        this.gameModel.leftSideUser.model.set('name', 'Left User');
        expect(this.home.render().query('#left-player .panel-title').innerText).toContain('Left User');
    });

    it('reflects name set on gameModel user in left panel', function() {
        this.gameModel.rightSideUser.model.set('name', 'Right User');
        expect(this.home.render().query('#right-player .panel-title').innerText).toContain('Right User');
    });
});

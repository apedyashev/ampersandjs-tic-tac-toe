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
        expect(this.home.render().query('#left-player .panel-title').innerText).toContain('Please enter your name');
    });

    it('ask right-side user for his name', function() {
        expect(this.home.render().query('#right-player .panel-title').innerText).toContain('Please enter your name');
    });

    it('reflects name set on gameModel user in left panel', function() {
        this.gameModel.leftSideUser.model.set('name', 'Left User');
        expect(this.home.render().query('#left-player .panel-title').innerText).toContain('Left User');
    });

    it('reflects name set on gameModel user in left panel', function() {
        this.gameModel.rightSideUser.model.set('name', 'Right User');
        expect(this.home.render().query('#right-player .panel-title').innerText).toContain('Right User');
    });

    it('shows error message and adds error class when empty string entered to input for the left user', function() {
        this.home.render();
        const input = this.home.query('#left-player input[type="text"]'),
            button = this.home.query('#left-player button[type="submit"]'),
            name = `Left user ${(new Date).getTime()}`;

        input.value = '';
        button.click();

        expect(this.home.query('#left-player .form-group').className).toContain('has-error');
        expect(this.home.query('#left-player span[data-hook="message-text"]').innerText).toEqual('This field is required.');
        expect(this.home.query('#left-player .panel-title').innerText).toContain('Please enter your name');
    });

    it('reflects name entered to input for the left user', function() {
        this.home.render();
        const input = this.home.query('#left-player input[type="text"]'),
            button = this.home.query('#left-player button[type="submit"]'),
            name = `Left user ${(new Date).getTime()}`;

        input.value = name;
        button.click();

        expect(this.home.query('#left-player .panel-title').innerText).toContain(name);
    });

    it('reflects name entered to input for the right user', function() {
        this.home.render();
        const input = this.home.query('#right-player input[type="text"]'),
            button = this.home.query('#right-player button[type="submit"]'),
            name = `Right user ${(new Date).getTime()}`;

        input.value = name;
        button.click();

        expect(this.home.query('#right-player .panel-title').innerText).toContain(name);
    });

    it('shows error message and adds error class when empty string entered to input for the right user', function() {
        this.home.render();
        const input = this.home.query('#right-player input[type="text"]'),
            button = this.home.query('#right-player button[type="submit"]'),
            name = `Right user ${(new Date).getTime()}`;

        input.value = '';
        button.click();

        expect(this.home.query('#right-player .form-group').className).toContain('has-error');
        expect(this.home.query('#right-player span[data-hook="message-text"]').innerText).toEqual('This field is required.');
        expect(this.home.query('#right-player .panel-title').innerText).toContain('Please enter your name');
    });

    it('resets user panels when the New Game button is clicked', function() {
        this.home.render();
        const leftUserInput = this.home.query('#left-player input[type="text"]'),
            rightUserInput = this.home.query('#right-player input[type="text"]'),
            leftUserButton = this.home.query('#left-player button[type="submit"]'),
            rightUserButton = this.home.query('#right-player button[type="submit"]'),
            leftUserName = `Left user ${(new Date).getTime()}`,
            rightUserName = `Right user ${(new Date).getTime()}`,
            newGameButton = this.home.query('button[data-hook="new-game"]');

        leftUserInput.value = leftUserName;
        leftUserButton.click();

        rightUserInput.value = rightUserName;
        rightUserButton.click();

        expect(this.home.query('#left-player .panel-title').innerText).toContain(leftUserName);
        expect(this.home.query('#right-player .panel-title').innerText).toContain(rightUserName);

        newGameButton.click();

        expect(this.home.query('#left-player .panel-title').innerText).not.toContain(leftUserName);
        expect(this.home.query('#right-player .panel-title').innerText).not.toContain(rightUserName);
    });
});

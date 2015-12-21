import PastGamesPageView from '../../src/pages/past-games'
import GameModel from '../../src/models/game'
import GamesCollection from '../../src/collections/games'
import AmpersandPlayer from '../../src/game_core/ampersand-player'
import NoughtBrush from '../../src/game_core/nought-brush'
import CrossBrush from '../../src/game_core/cross-brush'
import app from 'ampersand-app'

describe('The PastGamesPageView view', function() {
    beforeEach(function() {
        this.games = new GamesCollection();
        // url is used as a key when reading from localStorage. Unuique url guarantiees that collection will be empty
        this.games.url = (new Date).getTime();

        this.pastGamesView = new PastGamesPageView({
            collection: this.games
        });
    });

    afterEach(function() {
        this.games = null;
        this.pastGamesView = null;
    });

    it('is a view', function() {
        expect(this.pastGamesView.cid).toBeDefined();
        expect(this.pastGamesView.cid).toContain("view");
    });

    it('renders correct template', function() {
        expect(this.pastGamesView.render().el.innerHTML).toContain('Past games');
    });

    it('displays "No winners yet" when collection is empty', function() {
        expect(this.pastGamesView.render().query('tbody').innerText).toContain('No winners yet');
    });

    it('displays users added to the games collection', function() {
        const leftUserName = `Left user ${(new Date).getTime()}`,
            rigthUSerName = `Right user ${(new Date).getTime()}`,
            leftSideUser = new AmpersandPlayer(new NoughtBrush(), {name: leftUserName, symbol: 'nought'}),
            rightSideUser = new AmpersandPlayer(new CrossBrush(), {name: rigthUSerName, symbol: 'cross'}),
            game = new GameModel({
                leftSideUser: leftSideUser,
                rightSideUser: rightSideUser
            });
        this.games.add(game);
        this.pastGamesView.render();
        expect(this.pastGamesView.query(('[data-hook="left-user-name left-user-win-class"]')).innerText)
            .toContain(leftUserName);
        expect(this.pastGamesView.query(('[data-hook="right-user-name right-user-win-class"]')).innerText)
            .toContain(rigthUSerName);
    });
});

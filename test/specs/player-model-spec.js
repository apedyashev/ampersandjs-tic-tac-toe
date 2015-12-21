//import PastGamesPageView from '../../src/pages/past-games'
import PlayerModel from '../../src/models/player'
//import GamesCollection from '../../src/collections/games'
//import AmpersandPlayer from '../../src/game_core/ampersand-player'
//import NoughtBrush from '../../src/game_core/nought-brush'
//import CrossBrush from '../../src/game_core/cross-brush'
//import app from 'ampersand-app'

describe('The PlayerModel model', function() {
    beforeEach(function() {
        this.player = new PlayerModel();
    });

    afterEach(function() {
        this.player = null;
    });

    it('is a model', function() {
        expect(this.player.cid).toBeDefined();
        expect(this.player.cid).toContain("state");
    });

    it('isInitialized becomes to true when name is set to non-empty string', function() {
        expect(this.player.get('isInitialized')).toEqual(false);
        this.player.set('name', 'dart wader');
        expect(this.player.get('isInitialized')).toEqual(true);
        this.player.set('name', '');
        expect(this.player.get('isInitialized')).toEqual(false);
    });

    it('isNotInitialized becomes to false when name is set to non-empty string', function() {
        expect(this.player.get('isNotInitialized')).toEqual(true);
        this.player.set('name', 'dart wader');
        expect(this.player.get('isNotInitialized')).toEqual(false);
        this.player.set('name', '');
        expect(this.player.get('isNotInitialized')).toEqual(true);
    });

    it('sets fullInfo to concatenation of name and " [WINNER]" is either name or isWon changed', function() {
        this.player.set({
            'name': 'luke skywalker',
            isWon: false
        });
        expect(this.player.get('fullInfo')).toEqual('luke skywalker');

        this.player.set({
            'name': 'luke skywalker',
            isWon: true
        });
        expect(this.player.get('fullInfo')).toEqual('luke skywalker [WINNER]');

        this.player.set({
            'name': 'luke skywalker',
            isWon: false
        });
        expect(this.player.get('fullInfo')).toEqual('luke skywalker');
    });
});

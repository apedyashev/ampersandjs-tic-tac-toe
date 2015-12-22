import GameModel from '../../src/models/game'
import AmpersandPlayer from '../../src/game_core/ampersand-player'
import NoughtBrush from '../../src/game_core/nought-brush'
import CrossBrush from '../../src/game_core/cross-brush'

describe('The GameModel model', function() {
    beforeEach(function() {
        this.gameModel = new GameModel({
            leftSideUser: new AmpersandPlayer(new NoughtBrush(), {symbol: 'nought'}),
            rightSideUser: new AmpersandPlayer(new CrossBrush(), {symbol: 'cross'})
        });
    });

    afterEach(function() {
        this.gameModel = null;
    });

    it('is a model', function() {
        expect(this.gameModel.cid).toBeDefined();
        expect(this.gameModel.cid).toContain("state");
    });

    it('appends #1 to right user, if right user has the same name as left user', function() {
        this.gameModel.leftSideUser.model.set('name', 'cool user');
        this.gameModel.rightSideUser.model.set('name', 'cool user');

        expect(this.gameModel.leftSideUser.model.get('name')).toEqual('cool user');
        expect(this.gameModel.rightSideUser.model.get('name')).toEqual('cool user #1');
    });

    it('appends #1 to left user, if left user has the same name as right user', function() {
        this.gameModel.rightSideUser.model.set('name', 'cool user');
        this.gameModel.leftSideUser.model.set('name', 'cool user');

        expect(this.gameModel.rightSideUser.model.get('name')).toEqual('cool user');
        expect(this.gameModel.leftSideUser.model.get('name')).toEqual('cool user #1');
    });

    it('changes isThereWinner prop when isGameOver changes', function() {
        this.gameModel.rightSideUser.model.set({'isWon': true});
        this.gameModel.leftSideUser.model.set({'isWon': false});
        this.gameModel.set('isGameOver', false);

        expect(this.gameModel.get('isThereWinner')).toEqual(false);

        this.gameModel.set('isGameOver', true);
        expect(this.gameModel.get('isThereWinner')).toEqual(true);

        this.gameModel.set('isGameOver', false);
        expect(this.gameModel.get('isThereWinner')).toEqual(false);

        this.gameModel.rightSideUser.model.set({'isWon': false});
        this.gameModel.set('isGameOver', true);
        expect(this.gameModel.get('isThereWinner')).toEqual(false);
    });
});

/**
 * Base player class which provides interface that is used by GameBoard
 */
export default class Player {
    constructor(brush) {
        if (!brush) {
            throw new Error('Players constructor accepts brush');
        }
        this._brush = brush;
    }

    get brush() {
        return this._brush;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    set isMyTurn(val) {
        this._isMyTurn = val;
    }

    get isMyTurn() {
        return this._isMyTurn;
    }

    set isWon(val) {
        this._isWon = val;
    }

    get isWon() {
        return this._isWon;
    }

    get isInitialized() {
        throw new Error('isInitialized is not implemented for Player');
    }

    set brushColor(val) {
        this._brush.color = val;
    }

    get brushColor() {
        return this._brush.color;
    }
}
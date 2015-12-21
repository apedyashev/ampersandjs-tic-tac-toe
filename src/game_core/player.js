import Brush from './brush'

/**
 * Base player class which provides interface that is used by {@link GameBoard}.
 * It supposed to be used as a base class to create framework-specific implementation
 *
 * @interface
 */
export default class Player {
    /**
     * Initialized the player with an instance of a class derived from {@link Brush}
     * @param {CrossBrush|NoughtBrush}  brush - object that implements drawing function
     *
     * @throws instance of the Error
     */
    constructor(brush) {
        if (!brush || !(brush instanceof Brush)) {
            throw new Error('Players constructor accepts instance of Brush');
        }
        this._brush = brush;
    }

    /**
     * Returns player's brush
     * @returns {CrossBrush|NoughtBrush}
     */
    get brush() {
        return this._brush;
    }

    /**
     * Returns player name
     * @returns  {string} player name
     */
    get name() {
        return this._name;
    }

    /**
     * Sets player's name
     * @param {string} name - player's name
     */
    set name(name) {
        this._name = name;
    }

    /**
     * Sets isMyTurn flag
     * @param {boolean} val - new value
     */
    set isMyTurn(val) {
        this._isMyTurn = val;
    }

    /**
     * Gets isMyTurn flag
     * @returns {boolean} - isMyTurn flag
     */
    get isMyTurn() {
        return this._isMyTurn;
    }

    /**
     * Sets isWon flag
     * @param {boolean} val - isWon flag
     */
    set isWon(val) {
        this._isWon = val;
    }

    /**
     * Returns isWon flag
     * @returns {boolean}
     */
    get isWon() {
        return this._isWon;
    }

    /**
     * Returns isInitialized. Must be overriden by derived class
     *
     * @throws {Error}
     */
    get isInitialized() {
        throw new Error('isInitialized is not implemented for Player');
    }

    /**
     * Sets color of player's brush
     * @param {string} val - Hex value of color. E.g. '#fcf'
     */
    set brushColor(val) {
        this._brush.color = val;
    }

    /**
     * Returns color of player's brush
     * @returns {string}
     */
    get brushColor() {
        return this._brush.color;
    }
}

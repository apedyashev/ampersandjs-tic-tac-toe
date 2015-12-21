import Player from './player'
import PlayerModel from '../models/player'

/**
 * AmpersandJS-specific implementation of player. Stores the player data in instance of {@link PlayerModel}
 *
 * @implements {Player}
 */
export default class AmpersandPlayer extends Player {
    /**
     * Initialized the player with an instance of a class derived from {@link Brush} and optionally with user's data
     * @param {CrossBrush|NoughtBrush}  brush - object that implements drawing function
     * @param {hash} userData - props of {@link PlayerModel}
     *
     * @throws {Error}
     */
    constructor(brush, userData = {}) {
        super(brush);
        if (!userData.id) {
            userData.id = (new Date).getTime();
        }
        this._user = new PlayerModel(userData);
    }

    /**
     * Returns player name
     * @returns  {string} player name
     */
    get name() {
        return this._user.get('name');
    }

    /**
     * Sets player's name
     * @param {string} name - player's name
     */
    set name(name) {
        this._user.get('name', name);
    }

    /**
     * Returns AmpersandJS model storing player's data
     * @returns  {PlayerModel} player model
     */
    get model() {
        return this._user;
    }

    /**
     * Sets isMyTurn flag
     * @param {boolean} val - new value
     */
    set isMyTurn(val) {
        this._user.set('isMyTurn', val);
    }

    /**
     * Gets isMyTurn flag
     * @returns {boolean} - isMyTurn flag
     */
    get isMyTurn() {
        return this._user.get('isMyTurn');
    }

    /**
     * Sets isWon flag
     * @param {boolean} val - isWon flag
     */
    set isWon(val) {
        this._user.set('isWon', val);
    }

    /**
     * Returns isWon flag
     * @returns {boolean}
     */
    get isWon() {
        return this._user.get('isWon');
    }

    /**
     * Returns isInitialized property of {@link PlayerModel}'s instance
     */
    get isInitialized() {
        return this._user.get('isInitialized');
    }
}

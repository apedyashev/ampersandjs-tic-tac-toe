import Player from './player'
import PlayerModel from '../models/player'

/**
 * Framework specific implementation
 */
export default class AmpersandPlayer extends Player {
    constructor(brush, userData = {}) {
        super(brush);
        if (!userData.id) {
            userData.id = (new Date).getTime();
        }
        this._user = new PlayerModel(userData);
    }

    get name() {
        return this._user.get('name');
    }

    set name(name) {
        this._user.get('name', name);
    }

    get model() {
        return this._user;
    }

    set isMyTurn(val) {
        this._user.set('isMyTurn', val);
    }

    get isMyTurn() {
        return this._user.get('isMyTurn');
    }

    set isWon(val) {
        this._user.set('isWon', val);
    }

    get isWon() {
        return this._user.get('isWon');
    }

    get isInitialized() {
        return this._user.get('isInitialized');
    }
}

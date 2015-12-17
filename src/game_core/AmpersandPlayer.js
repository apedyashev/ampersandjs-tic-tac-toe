import {Player} from './Player'
//import {Person} from '../models/person'
import {Person} from '../models/person'

/**
 * Framework specific implementation
 */
class AmpersandPlayer extends Player {
    constructor(brush) {
        super(brush);
        this._user = new Person();
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

export {AmpersandPlayer}

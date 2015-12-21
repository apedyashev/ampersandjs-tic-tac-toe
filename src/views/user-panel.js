import View from 'ampersand-view'
import PlayerNameForm from '../forms/player-name'

const templates = require('../templates');

/**
 * Displays users panel. See {@link https://ampersandjs.com/docs/#ampersand-view}
 */
const UserPanelView = View.extend({
    template: templates['includes/user-panel'],
    bindings: {
        'model.symbol': {
            type: 'switchClass',
            name: 'hide',
            cases: {
                'nought': '.symbol-icon.fa-times',
                'cross': '.symbol-icon.fa-circle-o'
            }
        },
        'model.isInitialized': [{
                type: 'booleanClass',
                hook: 'player-is-initialized',
                yes: '',
                no: 'panel-danger'
            },
            {
                type: 'booleanClass',
                hook: 'show-if-initialized',
                yes: '',
                no: 'hide'
            },
            {
                type: 'booleanClass',
                hook: 'hide-if-initialized',
                yes: 'hide',
                no: ''
            }],
        'model.isMyTurn': [{
                type: 'booleanClass',
                hook: 'my-turn',
                yes: 'panel-success',
                no: ''
            },
            {
                type: 'booleanClass',
                hook: 'my-turn-visible',
                yes: '',
                no: 'hide'
            },
            {
                type: 'booleanClass',
                hook: 'show-if-not-my-turn',
                yes: 'hide',
                no: ''
            }],
        'model.isWon': [{
                type: 'booleanClass',
                hook: 'show-if-player-won',
                yes: '',
                no: 'hide'
            },
            {
                type: 'booleanClass',
                hook: 'hide-if-player-won',
                yes: 'hide',
                no: ''
            }],
        'model.name': {
            hook: 'player-name'
        }
    },
    subviews: {
        playerInfoForm: {
            container: 'form',
            waitFor: 'model.isNotInitialized',
            prepareView: function(el) {
                return new PlayerNameForm({
                    el: el,
                    model: this.model,
                    submitCallback: function(data) {
                        console.log(data);
                        this.model.set(data);
                    }
                });
            }
        }
    }
});
export default UserPanelView


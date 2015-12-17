var View = require('ampersand-view');
var templates = require('../templates');
var PlayerNameForm = require('../forms/player-name');


module.exports = View.extend({
    template: templates['includes/user-panel'],
    bindings: {
        'model.isInitialized': [{
                type: 'booleanClass',
                hook: 'player-is-initialized',
                //name: 'active',
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
            }],
        'model.isWon': {
            type: 'booleanClass',
            hook: 'player-won',
            yes: '',
            no: 'hide'
        },
        'model.name': {
            hook: 'player-name'
        }
    },
    subviews: {
        playerInfoForm: {
            container: 'form',
            waitFor: 'model.isNotInitialized',
            prepareView: function (el) {
                return new PlayerNameForm({
                    el: el,
                    model: this.model,
                    submitCallback: function (data) {
                        console.log(data);
                        this.model.set(data);
                    }
                });
            }
        },
    }
});


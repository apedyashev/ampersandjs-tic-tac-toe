import View from  'ampersand-view'
const templates = require('../templates');

/**
 * View of finished game item. Used to render collection
 */
const FinishedGameView = View.extend({
    template: templates['includes/finished-game'],
    bindings: {
        'model.leftSideUser.model.fullInfo': {
            'hook': 'left-user-name'
        },
        'model.rightSideUser.model.fullInfo': {
            'hook': 'right-user-name'
        },
        'model.leftSideUser.model.isWon': {
            'hook': 'left-user-win-class',
            type: 'booleanClass',
            yes: 'label-success',
            no: 'label-danger'
        },
        'model.rightSideUser.model.isWon': {
            'hook': 'right-user-win-class',
            type: 'booleanClass',
            yes: 'label-success',
            no: 'label-danger'
        }
    }
});
export default FinishedGameView

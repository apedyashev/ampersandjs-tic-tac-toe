import View from  'ampersand-view'
let templates = require('../templates');

export default View.extend({
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

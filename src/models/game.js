var AmpersandModel = require('ampersand-model');

module.exports = AmpersandModel.extend({
    props: {
        leftSideUser: 'any',
        rightSideUser: 'any'
    },

    initialize: function() {
        this.leftSideUser.model.on('change:name', () => {
            let leftSideUserName = this.leftSideUser.model.get('name'),
                rightSideUSerName = this.rightSideUser.model.get('name');
            if (leftSideUserName && (leftSideUserName === rightSideUSerName)) {
                this.leftSideUser.model.set('name', leftSideUserName + ' #1');
            }
        });

        this.rightSideUser.model.on('change:name', () => {
            let leftSideUserName = this.leftSideUser.model.get('name'),
                rightSideUSerName = this.rightSideUser.model.get('name');
            if (rightSideUSerName && (leftSideUserName === rightSideUSerName)) {
                this.rightSideUser.model.set('name', rightSideUSerName + ' #1');
            }
        });
    }
});

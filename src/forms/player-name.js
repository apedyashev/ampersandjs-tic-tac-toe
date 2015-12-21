import FormView  from 'ampersand-form-view'
import InputView from 'ampersand-input-view'
const templates = require('../templates'),
    ExtendedInput = InputView.extend({
        template: templates['includes/form-input']()
    });

export default FormView.extend({
    fields: function() {
        return [
            new ExtendedInput({
                label: 'Name',
                name: 'name',
                value: this.model && this.model.name,
                placeholder: 'Name',
                parent: this
            })
        ];
    }
});

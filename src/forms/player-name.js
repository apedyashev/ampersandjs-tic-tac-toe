import FormView  from 'ampersand-form-view'
import InputView from 'ampersand-input-view'
const templates = require('../templates'),
    ExtendedInput = InputView.extend({
        template: templates['includes/form-input']()
    });

/**
 * Form view for player name entering see {@link https://github.com/AmpersandJS/ampersand-form-view}
 */
const PlayerNameForm = FormView.extend({
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
export default PlayerNameForm

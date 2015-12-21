import Collection from 'ampersand-rest-collection'
import GameModel from '../models/game'

export default Collection.extend({
    model: GameModel,
    url: '/api/games',

    initialize: function() {
        // Attempt to read from localStorage right away
        // this also adds them to the collection
        this.readFromLocalStorage();

        // We listen for changes to the collection
        // and persist on change
        this.on('all', this.writeToLocalStorage, this);
    },

    writeToLocalStorage: function() {
        localStorage[this.url] = JSON.stringify(this);
    },

    readFromLocalStorage: function() {
        var existingData = localStorage[this.url];
        if (existingData) {
            this.set(JSON.parse(existingData));
        }
    }
});

var Collection = require('ampersand-rest-collection');
var Game = require('../models/game');


module.exports = Collection.extend({
    model: Game,
    url: '/api/games'
});

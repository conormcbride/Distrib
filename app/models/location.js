var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
    Location: String

});

module.exports = mongoose.model('Location', LocationSchema);
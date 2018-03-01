var mongoose = require('mongoose');

var BarSchema = new mongoose.Schema({
    user: String,
    location: String,
    date: Date,
    length: Number
});

module.exports = mongoose.model('Bar', BarSchema);
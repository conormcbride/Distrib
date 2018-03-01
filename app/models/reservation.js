var mongoose = require('mongoose');

var ReservationSchema = new mongoose.Schema({
    user: String,
    location: String,
    date: Date,
    length: Number
});

module.exports = mongoose.model('Reservation', ReservationSchema);
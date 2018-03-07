var mongoose = require('mongoose');

var ReservationSchema = new mongoose.Schema({
    capacity: Number,
    roomType:String,
    eventType:String,
    date:String,
    length: Number

});

module.exports = mongoose.model('Reservation', ReservationSchema);
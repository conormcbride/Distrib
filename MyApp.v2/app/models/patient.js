var mongoose = require('mongoose');

var PatientSchema = new mongoose.Schema({
    fname: String,
    sname: String,
    address: String,
    contact: Number,
    date: {type: Date, default:Date.now()}
});

module.exports = mongoose.model('Patient', PatientSchema);
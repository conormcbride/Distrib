var mongoose = require('mongoose');

var DoctorSchema = new mongoose.Schema({
    fname: String,
    sname: String,
    branch: String,
    contact: Number,
});

module.exports = mongoose.model('Doctor', DoctorSchema);
var Location = require('../models/location');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/locations');

var db = mongoose.connection;

router.findAll = function(req, res) {

    Location.find(function(err, location) {
        if (err)
            res.send(err);

        res.json(location);
    });
}




db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected to database');
});
module.exports = router;
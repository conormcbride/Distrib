var Reservation = require('../models/reservation');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.findAll = function(req, res) {

    Reservation.find(function(err, reservations) {
        if (err)
            res.send(err);

        res.json(reservations);
    });
}
router.findOne = function(req, res) {

    Reservation.find({ "_id" : req.params.id },function(err, Reservation) {
        if (err)
            res.json({ message: 'Reservation NOT Found!', errmsg : err } );
        else
            res.json(Reservation);
    });
}

router.addReservation = function(req, res) {

    var reservation = new Reservation();

    reservation.user = req.body.user;
    reservation.location = req.body.location;
    reservation.date = req.body.date;
    reservation.length = req.body.length;

    console.log('Adding Reservation: ' + JSON.stringify(Reservation));


    reservation.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Reservation  Added!', data: Reservation });
    });
}

router.deleteReservation = function(req, res) {
    Reservation.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Reservation Deleted!'});
    });
}



module.exports = router;
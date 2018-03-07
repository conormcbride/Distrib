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

    reservation.roomType = req.body.roomType;
    reservation.eventType = req.body.eventType;
    var date = new Date(req.body.date);
    var tempDate = date.toLocaleDateString()
    reservation.date = tempDate
    reservation.length = req.body.length;
    reservation.capacity = req.body.capacity;

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


router.updateCapacity = function(req, res) {

    Reservation.findById(req.params.id, function(err,reservation) {
        if (err)
            res.send(err);
        else {
            reservation.capacity =+ req.body.capacity;
            reservation.save(function (err) {
                if (err)
                    res.send(err);
                else
                    res.json({ message: 'Reservation capacity have been updated!', data: reservation });
            });
        }
    })
}


module.exports = router;
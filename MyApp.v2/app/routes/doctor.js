var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Doctor = require('../models/doctor')

router.findAll = function (req, res) {
    Doctor.find(function (err, doctor) {
        if (err){
            res.send(err)
        }else
            res.json(doctor)
    })

}
router.addDoctor = function(req, res) {

    var doctor = new Doctor();

    doctor.fname = req.body.fname;
    doctor.sname = req.body.sname;
    doctor.branch = req.body.branch;
    doctor.contact = req.body.contact;

    console.log('Adding Doctor details: ' + JSON.stringify(doctor));

    // Save the donation and check for errors
    doctor.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Doctor Added', data: doctor });
    });
}



router.deleteDoctor = function(req, res) {

    Doctor.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Doctor Deleted!'});
    });
}

module.exports = router;
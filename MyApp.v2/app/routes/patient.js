var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Patients = require('../models/patient')

router.findAll = function (req, res) {
    Patients.find(function (err, patients) {
        if (err){
            res.send(err)
        }else
            res.json(patients)
    })

}
router.addPatient = function(req, res) {

    var patient = new Patients();

    patient.fname = req.body.fname;
    patient.sname = req.body.sname;
    patient.address = req.body.address;
    patient.contact = req.body.contact;

    console.log('Adding Patient details: ' + JSON.stringify(patient));

    // Save the donation and check for errors
    patient.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Patient Added', data: patient });
    });
}

router.updatePatient = function(req, res) {

    Patients.findById(req.params.id, function(err,patient) {
        if (err)
            res.send(err);
        else {

            patient.fname = req.body.fname;
            patient.sname = req.body.sname;
            patient.address = req.body.address;
            patient.contact = req.body.contact;
            patient.save(function (err) {
                if (err)
                    res.send(err);
                else
                    res.json({ message: 'Patient Updated!', data: patient });
            });
        }
    });
}


router.deletePatient = function(req, res) {

    Patients.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Patient Deleted!'});
    });
}

module.exports = router;
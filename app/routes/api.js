var User = require('../models/user')
var jwt = require('jsonwebtoken')
var secret = 'password';
var express = require('express');
var router = express.Router();



module.exports =  function(router){
    var app = this;
    app.token = jwt;

    router.post('/users', function (req, res) {
    var user = new User();
        user.fname = req.body.fname
        user.password = req.body.password
        user.email = req.body.email
        user.lname = req.body.lname
        user.mobileNo = req.body.mobileNo
        user.userType = req.body.userType

    if (req.body.fname == null || req.body.fname =='' ||
        req.body.password == null || req.body.password =='' ||
        req.body.email == null    || req.body.email =='' ||
        req.body.lname == null    || req.body.lname =='' ||
        req.body.mobileNo == null || req.body.mobileNo =='' ||
        req.body.userType == null     || req.body.userType ==''
        ){

        res.json({
            success:false,
            message:'Ensure nothing is left empty'
        })
    }else user.save(function (err) {
        if( err){
            res.json({
                success:false,
                message:'Username or Email already exists'
            })
        }else{
            res.json({
                success:true,
                message:'User Created!'})
    }
    });


    })


    router.post('/authenticate', function (req, res) {
        // res.send('testing new route')
        User.findOne({username: req.body.username}).select('email username password').exec(function (err, user) {
            if(err) throw err;

            if(!user){
                res.json({
                    success: false,
                    message:'Could not authenticate user'
                })
            }else if (user){
                if(req.body.password){
                var validPassword = user.comparePassword(req.body.password)
                }else {
                    res.json({
                        success: false,
                        message:'No password provided'
                    })
                }
                if(!validPassword){
                    res.json({
                        success: false,
                        message:'Could not authenticate password'
                    })
                }else {
                    app.token = jwt.sign({
                        username:user.username,
                        email:user.email
                    }, secret, {expiresIn: '24hr'})
                    res.json({
                        success: true,
                        message:'User authenticated',
                        token : token
                    })
                }
            }
        })
    })

    router.use(function (req, res, next) {
       var token = req.body.token || req.body.query || req.headers['x-access-token']

        if (token){
            jwt.verify(token, secret, function (err, decoded) {
                if (err){
                    res.json({
                        success: false,
                        message: 'Token invalid'
                    })
                }else {
                    req.decoded = decoded
                    next()
                }
            })
        } else {
            res.json({
                success: false,
                message: 'No token provided'
            })
        }
    })


    router.post('/me', function (req, res) {
        res.send(req.decoded)
    })
    return router; //returns route to the server when accessed

}
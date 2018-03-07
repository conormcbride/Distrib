var express = require('express')
var app = express()
var port = process.env.PORT || 3000
var morgan = require('morgan')// <------Middleware------->
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var router = express.Router()
var appRoutes = require('./app/routes/api')(router)  //user router object with this route file
var path = require('path')
var User = require('./app/models/user')


// <!-- All Routes -->

var location = require('./app/routes/locationroutes')
var reservation = require('./app/routes/reservationroutes')
// var user = require('./app/routes/api.js')



app.use(morgan('dev')); // logs requests eg. "GET /404" or "GET/home 200 in console
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static(__dirname+ '/public'))//give frontend access to the public folder
app.use('/api', appRoutes);// defining backend routes to differentiate from frontend routes to avoid nameing conflictions



app.get('/location', location.findAll);


app.delete('/reservation/:id', reservation.deleteReservation);
app.get('/reservation/:id', reservation.findOne);
app.get('/reservation', reservation.findAll);
app.post('/reservation', reservation.addReservation);
app.put('/reservation/:id/update', reservation.updateCapacity);
// app.post('/users', function (req, res) {
//     var user = new User();
//     user.uname = req.body.uname
//     user.fname = req.body.fname
//     user.password = req.body.password
//     user.email = req.body.email
//     user.lname = req.body.lname
//     user.mobileNo = req.body.mobileNo
//     user.userType = req.body.userType
//
//     if (req.body.fname == null || req.body.fname ==''
//         ||req.body.uname == null || req.body.uname =='' ||
//         req.body.password == null || req.body.password =='' ||
//         req.body.email == null    || req.body.email =='' ||
//         req.body.lname == null    || req.body.lname =='' ||
//         req.body.mobileNo == null || req.body.mobileNo =='' ||
//         req.body.userType == null     || req.body.userType ==''
//     ){
//
//         res.json({
//             success:false,
//             message:'Ensure nothing is left empty'
//         })
//     }else user.save(function (err) {
//         if( err){
//             res.json({
//                 success:false,
//                 message:'Username or Email already exists'
//             })
//         }else{
//             res.json({
//                 success:true,
//                 message:'User Created!'})
//         }
//     })})


mongoose.connect('mongodb://localhost:27017/reservationdb', function(err){
    if (err){
        console.log('Not connected to the db' + err)
    } else {
        console.log('Successfully Connected to the db')

    }
});


app.get('*',function (req,res) {
    res.sendFile(path.join(__dirname+ '/public/app/views/index.html'))
});

// app.get('*',function (req,res) {
//     res.sendFile(path.join(__dirname))
// });


//process.env.PORT use 3000 or deployment enviornments server
app.listen(port, function () {
    console.log('Running Server on port '+ port)
});

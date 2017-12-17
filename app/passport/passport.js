var User = require('../models/user')
var session = require('express-session')


var jwt = require('jsonwebtoken')
var secret = 'password';





module.exports =function (passport,  FacebookStrategy, TwitterStrategy, GoogleStrategy, app) {


    // Start Passport Configuration Settings
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: {secure: false}}));

    passport.serializeUser(function (user, done) {
        token = jwt.sign({
            username: user.username,
            email: user.email
        }, secret, {expiresIn: '24hr'})
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });


    passport.use(new FacebookStrategy({
            clientID: '1774158029293153',
            clientSecret: 'e232451daa853dec110e17ee02052f02',
            callbackURL: "http://localhost:3000/auth/facebook/callback",
            profileFields: ['id', 'displayName', 'photos', 'email']

        },
        function (accessToken, refreshToken, profile, done) {
            User.findOne({
                email: profile._json.email
            }).select('username password email').exec(function (err, user) {
                if (err) {
                    done(err)
                }
                if (user && user != null) {
                    done(null, user)

                } else {
                    done(err)
                }
            })
        }
    ));
//
    passport.use(new TwitterStrategy({
            consumerKey: 'VVRNZKbfrmHmlUjH48VojNPve',
            consumerSecret: 'FiJk28FcH9NgozJquUN6bMRktgJquZh2RyAxYzXNIqboZLKg2O',
            callbackURL: "http:/localhost:3000/auth/twitter/callback",
            userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true"
        },
        function (token, tokenSecret, profile, done) {
            // User.findOrCreate(..., function(err, user) {
            //     if (err) { return done(err); }
            //     done(null, user);
            // });
            console.log()
            User.findOne({
                email: profile.emails[0].value
            }).select('username password email').exec(function (err, user) {
                if (err) {
                    done(err)
                }
                if (user && user != null) {
                    done(null, user)

                } else {
                    done(err)
                }
            })
        }
    ));


    passport.use(new GoogleStrategy({
            clientID: '1013243174-hsh3ihmk2pffjuiv1srbasicmpr83pkp.apps.googleusercontent.com',
            clientSecret: 'AUrCY51OT4iQ27rTzsab1kA0',
            callbackURL: "http://localhost:3000/auth/google/callback"
            // passReqToCallback   : true

        },
        function (request, accessToken, refreshToken, profile, done) {
            //console.log(profile.emails[0].value)

            console.log()
            User.findOne({
                email: profile.emails[0].value
            }).select('username password email').exec(function (err, user) {
                if (err) {
                    done(err)
                }
                if (user && user != null) {
                    done(null, user)

                } else {
                    done(err)

                }
            })

        }
    ));
    // 'https://www.googleapis.com/auth/plus.profile.emails.read'
    app.get('/auth/google',
        passport.authenticate('google', {
                scope:
                    ['https://www.googleapis.com/auth/plus.login', 'profile', 'email'
                    ]
            }
        ));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/googleerror'
        }), function (req, res) {
            res.redirect('/google/' + token)
        });


    app.get('/auth/twitter', passport.authenticate('twitter'));

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {failureRedirect: '/twittererror'}), function (req, res) {
        res.redirect('/twitter/' + token)
    });

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            failureRedirect: '/facebookerror'
        }), function (req, res) {
            res.redirect('/facebook/' + token)
        });

    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));


    return passport;
}
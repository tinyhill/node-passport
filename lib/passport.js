var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var QqStrategy = require('passport-qq').Strategy;
var WechatStrategy = require('passport-wechat').Strategy;
var bCrypt = require('bcrypt-nodejs');
var User = require('../app/models/user');

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}

var Passport = function () {
    passport.serializeUser(function (user, done) {
        console.log('serializing user: ');
        console.log(user);
        done(null, user._id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            console.log('deserializing user:', user);
            done(err, user);
        });
    });
    passport.use(new QqStrategy({
            clientID: '101245023',
            clientSecret: '1a1c76befde401210becdcbb21aa8df7',
            callbackURL: 'http://passport.yougedi.com/auth/qq/callback'
        }, function (accessToken, refreshToken, profile, done) {
            done(null, profile);
        }
    ));
    passport.use(new WechatStrategy({
            appid: 'wx105e1734f66d5246',
            appsecret: '6d5fbee088a2e740fbf3a69160293939',
            callbackURL: 'http://192.168.1.7:3001/auth/wechat/callback',
            scope: 'snsapi_login',
            state: true
        }, function (token, tokenSecret, profile, done) {
            done(null, profile);
        }
    ));
    passport.use('register', new LocalStrategy({
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            function (req, username, password, done) {

                findOrCreateUser = function () {
                    // find a user in Mongo with provided username
                    User.findOne({'username': username}, function (err, user) {
                        // In case of any error, return using the done method
                        if (err) {
                            console.log('Error in SignUp: ' + err);
                            return done(err);
                        }
                        // already exists
                        if (user) {
                            console.log('User already exists with username: ' + username);
                            return done(null, false, {'message': 'User Already Exists'});
                        } else {
                            // if there is no user with that email
                            // create the user
                            var newUser = new User();

                            // set the user's local credentials
                            newUser.username = username;
                            newUser.password = createHash(password);

                            // save the user
                            newUser.save(function (err) {
                                if (err) {
                                    console.log('Error in Saving user: ' + err);
                                    throw err;
                                }
                                console.log('User Registration succesful');
                                return done(null, newUser);
                            });
                        }
                    });
                };
                // Delay the execution of findOrCreateUser and execute the method
                // in the next tick of the event loop
                process.nextTick(findOrCreateUser);
            })
    );
    passport.use('login', new LocalStrategy({
            passReqToCallback: true
        },
        function (req, username, password, done) {
            // check in mongo if a user with username exists or not
            User.findOne({'username': username},
                function (err, user) {
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist, log error & redirect back
                    if (!user) {
                        console.log('User Not Found with username ' + username);
                        return done(null, false, {'message': 'User Not found.'});
                    }
                    // User exists but wrong password, log the error
                    if (!isValidPassword(user, password)) {
                        console.log('Invalid Password');
                        return done(null, false, {'message': 'Invalid Password'});
                    }
                    // User and password both match, return user from
                    // done method which will be treated like success
                    return done(null, user);
                }
            );
        }));
};

module.exports = Passport;

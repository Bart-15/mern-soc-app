require('../db/db')
const User = require('../models/User')
const keys = require('../config/keys').JWT_SECRET;


const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys;

module.exports = (passport) => {
 passport.use(
     new JwtStrategy(opts,  (jwt_payload, done) => {
         User.findById(jwt_payload._id)
             .then((user) => {
                 if(user) {
                     return done(null, user)
                 }
                 return done(null, false)
             })
             .catch((error) => {
                 console.error(error);
             })
     })
 )
}
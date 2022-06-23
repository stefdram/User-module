const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const passport = require('passport');

const opts = {};
const userTable = require('/Users/stefandanielramli/Desktop/User-module project/UserModule_using_sequelize/src/database/models/User.js');

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'Random string';

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    console.log(jwt_payload);
    userTable.findOne({ id: jwt_payload.id }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    });
  })
);

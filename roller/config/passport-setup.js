const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");
const User = require("../models/user-model");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/redirect"
    },
    (accessToken, refreshToken, profile, done) => {
      //callback
      new User({
        username: profile.displayName,
        googleId: profile.id
      })
        .save()
        .then(newUser => {
          console.log("new user created " + newUser);
        });
    }
  )
);

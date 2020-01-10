const express = require("express");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const passwordSetup = require("./config/passport-setup");
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
const passport = require("passport");

const app = express();

// set view engine
app.set("view engine", "ejs");
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
// connect to mongodb

mongoose.connect(keys.mongodb.dbURI, mongoOptions, () => {
  console.log("connected to mongodb");
});

// set up routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

// create home route
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3001, () => {
  console.log("app now listening for requests on port 3001");
});

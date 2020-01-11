const express = require("express");
const passwordSetup = require("./config/passport-setup");
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
const passport = require("passport");
const BodyParser = require("body-parser");

//routes
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const scheduleRoutes = require("./routes/schedule-routes");
const topicDatabaseRoutes = require("./routes/topic-database-routes");
const meetingsArchiveRoutes = require("./routes/meetings-archive-routes");

const app = express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

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

// app listen
app.listen(3001, () => {
  console.log("app now listening for requests on port 3001");
});

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, mongoOptions, () => {
  console.log("connected to mongodb");
});

// set up routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/schedule", scheduleRoutes);
app.use("/topic-database", topicDatabaseRoutes);
app.use("/meetings-archive", meetingsArchiveRoutes);

// create home route
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

// API
const MeetingModel = require("./models/meeting-model");
const TopicModel = require("./models/topic-model");
// #region meetings

// post new meeting
app.post("/meetings", async (req, res) => {
  try {
    const meeting = new MeetingModel(req.body);
    const result = await meeting.save();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get all meetings
app.get("/meetings", async (req, res) => {
  try {
    const result = await MeetingModel.find().exec();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get specific meeting by id
app.get("/meetings/:id", async (req, res) => {
  try {
    const meeting = await MeetingModel.findById(req.params.id).exec();
    res.send(meeting);
  } catch (err) {
    res.status(500).send(err);
  }
});

// update specific meeting
app.put("/meetings/:id", async (req, res) => {
  try {
    const meeting = await MeetingModel.findById(req.params.id).exec();
    meeting.set(req.body);
    const result = await meeting.save();
    res.send(result);
  } catch {
    res.status(500).send(err);
  }
});

// delete specific meeting
app.delete("/meetings/:id", async (req, res) => {
  try {
    const result = await MeetingModel.deleteOne({ _id: req.params.id }).exec();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});
// #endregion

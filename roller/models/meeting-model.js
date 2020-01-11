const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const meetingSchema = new Schema({
  date: Number,
  topic: String,
  leader: String,
  duration: String,
  resourcesURL: String
});

const Meeting = mongoose.model("meeting", meetingSchema);

module.exports = Meeting;

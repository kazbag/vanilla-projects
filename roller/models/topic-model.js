const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const topicSchema = new Schema({
  topic: String,
  votes: Number,
  addedDate: Number,
  userAdded: String
});

const Meeting = mongoose.model("meeting", meetingSchema);

module.exports = Meeting;

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();

const mongoose = require("mongoose");
const keys = require("./config/keys");

app.use(bodyParser.json());
app.use(cookieParser());

const path = require("path");
// const db = require("./db");
const topicsCollection = "topics";
const meetingsCollection = "meetings";
const usersCollection = "users";

const authRoutes = require("./routes/auth-routes");
const passportSetup = require("./config/passport-setup");

app.listen(3001, err => {
  if (err) console.log("błąd połączenia");
  else {
    console.log("połączono na porcie 3001");
    app.set("view engine", "ejs");
    app.use("/auth", authRoutes);
    app.get("/", (req, res) => {
      res.render("home");
    });
  }
});
// connect to mongoose
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log("connected with db");
});

// db.connect(err => {
//   if (err) {
//     console.log("nie można połączyć z bazą");
//     process.exit(1);
//   } else {
//   }
// });

// homepage

// // all meetings
// app.get("/meetings", (req, res) => {
//   db.getDB()
//     .collection(meetingsCollection)
//     .find({})
//     .toArray((err, documents) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.json(documents);
//       }
//     });
// });

// // all topics

// app.get("/topics", (req, res) => {
//   db.getDB()
//     .collection(topicsCollection)
//     .find({})
//     .toArray((err, documents) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.json(documents);
//       }
//     });
// });

// // meetings sorted by date
// app.get("/meetings/sorted", (req, res) => {
//   db.getDB()
//     .collection(meetingsCollection)
//     .find({})
//     .sort({ date: 1 })
//     .toArray((err, documents) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.json(documents);
//       }
//     });
// });

// // closest meeting
// app.get("/meetings/incoming", (req, res) => {
//   db.getDB()
//     .collection(meetingsCollection)
//     .find({ date: { $gte: new Date().getTime() } })
//     .sort({ date: 1 })
//     .limit(1)
//     .toArray((err, documents) => {
//       if (err) console.log(err);
//       else res.json(documents);
//     });
// });

// // last meeting
// app.get("/meetings/lastone", (req, res) => {
//   db.getDB()
//     .collection(meetingsCollection)
//     .find({ date: { $lte: new Date().getTime() } })
//     .sort({ date: -1 })
//     .limit(1)
//     .toArray((err, documents) => {
//       if (err) console.log(err);
//       else res.json(documents);
//     });
// });

// // meetings archive
// app.get("/meetings/archive", (req, res) => {
//   db.getDB()
//     .collection(meetingsCollection)
//     .find({ date: { $lte: new Date().getTime() } })
//     .toArray((err, documents) => {
//       if (err) console.log(err);
//       else res.json(documents);
//     });
// });

// // update meeting
// app.put("/meetings/:id", (req, res) => {
//   const topicID = req.params.id;
//   const userInput = req.body;
//   db.getDB()
//     .collection(meetingsCollection)
//     .findOneAndUpdate(
//       { _id: db.getPrimaryKey(topicID) },
//       { $set: { topic: userInput.topic } },
//       { returnOriginal: false },
//       (err, result) => {
//         if (err) console.log(err);
//         else {
//           res.json(result);
//         }
//       }
//     );
// });

// // vote for topic
// app.put("/topics/vote/:id", (req, res) => {
//   const topicID = req.params.id;
//   const isVoted = Object.values(req.cookies).indexOf(topicID.toString()) > -1;
//   if (!isVoted) {
//     db.getDB()
//       .collection(topicsCollection)
//       .findOneAndUpdate(
//         { _id: db.getPrimaryKey(topicID) },
//         { $inc: { votes: 1 } },
//         { returnOriginal: false },
//         (err, result) => {
//           if (err) console.log(err);
//           else {
//             res.cookie(topicID, topicID, { maxAge: 24 * 60 * 60 * 1000 });
//             res.json(result);
//           }
//         }
//       );
//   }
// });

// // api udostępnia czas trwania hangouts

// // add new meeting
// app.post("/meetings", (req, res) => {
//   const userInput = req.body;
//   db.getDB()
//     .collection(meetingsCollection)
//     .insertOne(userInput, (err, result) => {
//       if (err) console.log(err);
//       else res.json({ result: result, document: result.ops[0] });
//     });
// });

// // remove meeting
// app.delete("/meetings/:id", (req, res) => {
//   const topicID = req.params.id;
//   db.getDB()
//     .collection(meetingsCollection)
//     .findOneAndDelete({ _id: db.getPrimaryKey(topicID) }, (err, result) => {
//       if (err) console.log(err);
//       else {
//         res.clearCookie(topicID.toString());
//         res.json(result);
//       }
//     });
// });

// patch http, swager, jsdocs

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const path = require("path");
const db = require("./db");
const collection = "topics";

app.get("/", (req, res) => {
  res.sendfile(path.join(__dirname, "index.html"));
});

app.get("/getTopics", (req, res) => {
  db.getDB()
    .collection(collection)
    .find({})
    .toArray((err, documents) => {
      if (err) {
        console.log(err);
      } else {
        console.log(documents);
        res.json(documents);
      }
    });
});

db.connect(err => {
  if (err) {
    console.log("nie można połączyć z bazą");
    process.exit(1);
  } else {
    app.listen(3000, () => {
      console.log("połączono z bazą");
    });
  }
});

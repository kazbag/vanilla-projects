const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const path = require("path");
const db = require("./db");
const collection = "topics";

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

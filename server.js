// links
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
// generates ids
const uuid = require("./helpers/uuid");
// port
const port = 3001;
// activates express
const app = express();

// needed middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// gets information from notes and index files
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);
// reads the file and returns data
app.get("/api/notes", (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
  });

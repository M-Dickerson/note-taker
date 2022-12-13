// required links DO NOT ERASE
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
// generates unique ids
const uuid = require("./helpers/uuid");
// port
const PORT = 3001;
// express
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
// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

// reads the file and returns data
app.get("/api/notes", (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
  });

  app.post("/api/notes", (req, res) => {
    console.info(`${req.method} request received to add notes`);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuid(),
      };

    const response = {
        status: "You did it!",
        body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
    } else {
    res.status(500).json("Error");}
  });
// logs where the server is being hosted
  app.listen(PORT, () =>
  console.log(`Server is at http://localhost:${PORT}`)
);

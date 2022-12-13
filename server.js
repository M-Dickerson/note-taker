// required links DO NOT ERASE
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
// port, uuid, and app
const PORT = process.env.PORT || 3001;
const uuid = require("./helpers/uuid");
const app = express();

// needed middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// gets information from notes file
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);
const readFromFile = util.promisify(fs.readFile);

// reads the file and returns data
app.get("/api/notes", (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
  });

app.post("/api/notes", (req, res) => {
    console.info(`${req.method} request received to add notes`);
  
    const { title, text } = req.body;
  
    if (title && text) {
      const newNote = {
        title,
        text,
        id: uuid(),
      };
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        } else {
          const notes = JSON.parse(data);
          notes.push(newNote);

          fs.writeFile(`./db/db.json`, JSON.stringify(notes, null, `\t`), (err) =>
            err
            ? console.error(err)
            : console.info(`You did it!`)
          );
        }
      })
    const response = {
    status: "You did it!",
    body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
    } else {
    res.status(500).json("Error");}
  });
// THIS HAS TO BE AT THE BOTTOM
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);
// logs where the server is being hosted
app.listen(PORT, () =>
  console.log(`App is listening on port http://localhost:${PORT}`)
);

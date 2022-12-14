// require const's
const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

const { notes } = require('./Develop/db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const generateUniqueID = require('generate-unique-id');

// Create note
function createNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
      path.join(__dirname, './Develop/db/db.json'),
      JSON.stringify({ notes: notesArray }, null, 2)
    );
  return note;
  };  

  // routes
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
  });

  app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  req.body.id = generateUniqueID();
  const note = createNote(req.body, notes);
  res.json(note);
});

//bonus
app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;

  const delNote = notes.findIndex(note => note.id ==id);

  notes.splice(delNote, 1);
  return res.send();
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

  
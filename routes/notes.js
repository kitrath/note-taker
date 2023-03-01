const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, appendToFile } = require('../utils/fs-utils');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json')
        .then((data) => res.json(JSON.parse(data)))
        .catch((err) => console.error(err));
});

notes.post('/', (req, res) => {
    const { title, text } = req.body;
    console.log("title:", title, "text:", text);
    
    if (title && text) {
        const newNote = {
            id: uuidv4(),
            title,
            text
        };

        appendToFile('./db/db.json', newNote);
        
        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error in creating note');
    }
});

module.exports = notes;
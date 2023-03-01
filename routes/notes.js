const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, writeToFile, appendToFile } = require('../utils/fs-utils');

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

notes.delete('/:id', (req, res) => {

    const id = req.params.id;

    readFromFile('./db/db.json').then((data) => {

        let removed = false;
        const currentList = JSON.parse(data);

        const newList = currentList.filter((item) => {
            if (item.id === id) {
                removed = true;
                return false;
            }
            return true;
        });

        writeToFile('./db/db.json', newList);

        if (removed) {
            res.json({
                status: 'success',
                body: `note ${id} removed from db.json`
            });
        } else {
            res.status(404).json({
                status: 'Not Found',
                body: `note ${id} not found`
            });
        }
    })
    .catch((err) => console.error(err))
});

module.exports = notes;
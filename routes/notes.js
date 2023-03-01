const notes = require('express').Router();

// Import file reading and writing helpers

notes.get('/', (req, res) => {
    console.log('GET request to /api/notes');
    res.status(200);
});

notes.post('/', (req, res) => {
    console.log('POST request to /api/notes');
    res.status(200);
});

module.exports = notes;
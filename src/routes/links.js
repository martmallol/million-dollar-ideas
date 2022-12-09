const express = require('express');
const router = express.Router();

const pool = require('../database'); // Connect DB

// Search for 'localhost:4000/links/add'
router.get('/add', (req, res) => {
    res.render('links/add');
})

// Complete a multi-million dollar idea form and save it.
router.post('/add', (req, res) => {
    res.send('received');
})

module.exports = router;
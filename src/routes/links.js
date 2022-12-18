const express = require('express');
const router = express.Router();

const pool = require('../database'); // Connect DB

// Search for 'localhost:4000/links/add'
router.get('/add', (req, res) => {
    res.render('links/add');
});

// Complete a multi-million dollar idea form and save it.
router.post('/add', async (req, res) => {
    const { title, money, description } = req.body;
    // I will link this object with the user that created it
    const newIdea = { // The body of the object I'm sending
        title,
        money,
        description
    };
    // This petition will take time, that's why I include await
    // Adding the petition into the 'links' table in my database
    // Query doesn't function with my PCs SQL
    await pool.query('INSERT INTO links set ?', [newIdea]);
    res.send('received');
});

// Search for 'localhost:4000/links/'
router.get('/', (req, res) => {
    // Query doesn't function with my PCs SQL
    const links = pool.query('SELECT * FROM links');
    console.log(links);
    res.render('links/list', { links });
});

module.exports = router;
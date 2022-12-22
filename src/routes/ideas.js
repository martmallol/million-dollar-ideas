const express = require('express');
const router = express.Router();

const pool = require('../database'); // Connect DB

// Search for 'localhost:4000/ideas/add'
router.get('/add', (req, res) => {
    res.render('ideas/add');
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
    // Adding the petition into the 'ideas' table in my database
    // Query doesn't function with my PCs SQL
    await pool.query('INSERT INTO ideas set ?', [newIdea]);
    res.send('received');
});

// Search for 'localhost:4000/ideas/'
router.get('/', (req, res) => {
    // Query doesn't function with my PCs SQL
    const ideas = pool.query('SELECT * FROM ideas');
    console.log(ideas);
    res.render('ideas/list', { ideas });
});

module.exports = router;
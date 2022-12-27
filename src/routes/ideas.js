const express = require('express');
const router = express.Router();
const pool = require('../database'); // Connect DB
// "Check if a user is authenticated or not" method
const { isLoggedIn } = require('../lib/auth'); 

// Every route is protected with 'isLoggedIn'!!

// Search for 'localhost:4000/ideas/add'
router.get('/add', isLoggedIn, (req, res) => {
    res.render('ideas/add');
});

// Complete a multi-million dollar idea form and save it.
router.post('/add', isLoggedIn, async (req, res) => { // Why is it important to do async? 
    /* "Cuando enviamos una requisición de datos a una API, tenemos la promesa de que 
    estos datos llegarán, pero hasta que eso suceda, el sistema debe seguir funcionando"*/
    const { title, money, description } = req.body;
    // I will link this object with the user that created it
    const newIdea = { // The body of the object I'm sending
        title,
        money,
        description
    };
    // This petition will take time, that's why I include await
    // Adding the petition into the 'ideas' table in my database
    await pool.query('INSERT INTO ideas set ?', [newIdea]);
    
    // Send msg
    req.flash('success', 'Idea saved succesfully.')
    // After editing, redirect to the main page
    res.redirect('/ideas');
});

// Search for 'localhost:4000/ideas/'
router.get('/', isLoggedIn, async (req, res) => { // Why is it important to do async?
    /* "Cuando enviamos una requisición de datos a una API, tenemos la promesa de que 
    estos datos llegarán, pero hasta que eso suceda, el sistema debe seguir funcionando"*/

    /*Al definir una función como async, podemos usar la palabra clave await antes de 
    cualquier expresión que retorne una promesa. De esta forma, la ejecución de la 
    función externa (la función async) se pausará hasta que se resuelva la Promesa. */
    const ideas = await pool.query('SELECT * FROM ideas');
    console.log(ideas);
    res.render('ideas/list', { ideas: ideas });
});

// Delete the idea with that id
router.get('/delete/:id', isLoggedIn, async (req, res) => {
    console.log(req.params.id); // Check if it send me the id
    const { id } = req.params;
    await pool.query('DELETE FROM ideas WHERE ID = ?', [id]);
    // Send msg
    req.flash('success', 'Idea removed succesfully.');
    res.redirect('/ideas'); // After deleting the idea, we get redirected to the main page again
});

// Edit the idea with that id
router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const idea = await pool.query('SELECT * FROM ideas WHERE id = ?', [id]);
    console.log(idea[0]);
    res.render('ideas/edit', {idea: idea[0]}); // Similar to the 'add' page
});

// POST request after editing the idea
router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { title, money, description } = req.body;
    const newIdea = { // The body of the object I'm sending
        title,
        money,
        description
    };
    // Update table on DB
    pool.query('UPDATE ideas set ? WHERE id = ?', [newIdea, id]);
    // Send msg
    req.flash('success', 'Idea updated succesfully.');
    // After editing, redirect to the main page
    res.redirect('/ideas');
})

module.exports = router;
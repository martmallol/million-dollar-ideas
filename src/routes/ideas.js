const express = require('express');
const router = express.Router();

const pool = require('../database'); // Connect DB

// Search for 'localhost:4000/ideas/add'
router.get('/add', (req, res) => {
    res.render('ideas/add');
});

// Complete a multi-million dollar idea form and save it.
router.post('/add', async (req, res) => { // Why is it important to do async? 
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
    res.send('received');
});

// Search for 'localhost:4000/ideas/'
router.get('/', async (req, res) => { // Why is it important to do async?
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
router.get('/delete/:id', async (req, res) => {
    console.log(req.params.id); // Check if it send me the id
    const { id } = await req.params;
    pool.query('DELETE FROM ideas WHERE ID = ?', [id]);
    res.redirect('/ideas'); // After deleting the idea, we get redirected to the main page again
});

module.exports = router;
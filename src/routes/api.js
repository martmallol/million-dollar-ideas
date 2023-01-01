const express = require('express');
const router = express.Router();
const pool = require('../database'); // Connect DB
const helpers = require('../lib/helpers');

// Users

// Get all users
router.get('/api/users', async (req, res) => {
    const users = await pool.query('SELECT * FROM users');
    console.log(users);
    (users) ? res.json(users): res.send(204);
});

// Get a specific user by id
router.get('/api/users/:id', async (req, res) => {
    console.log(req.params);
    const userInfo = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    console.log(userInfo);
    (userInfo.length) ? res.json(userInfo) : res.send(204);
});


// Create a user
router.post('/api/users', async (req, res) => {
    console.log(req.body);
    try {
        let { id, username, password, fullname } = req.body;
        
        // https://es.stackoverflow.com/questions/295196/node-js-select-sql-count-as-total-vacio

        const [sameId] = await pool.query('SELECT COUNT(*) as total FROM users WHERE id = ?', [id]);
        const [sameUsername] = await pool.query('SELECT COUNT(*) as total FROM users WHERE username = ?', [username]);
        console.log(sameId.total), console.log(sameUsername.total);      
        
        if (sameId.total + sameUsername.total != 0) { // Cannot be an existent id or username   
            res.status(409).json({error: 'Conflict'});
        } else {
            password = await helpers.encryptPassword(password); // Encrypt password
            await await pool.query('INSERT INTO users SET ? ', { id, username, password, fullname });
            res.status(201).json({status: 'Created'});; // 'Created'
        }
    } catch(err) {
        console.log(err)
        res.status(400).json({error: 'Bad Request'});
    }
    // https://stackoverflow.com/questions/3825990/http-response-code-for-post-when-resource-already-exists
});

// Update a user

// Delete a user

// Delete all users


// Ideas

module.exports = router;
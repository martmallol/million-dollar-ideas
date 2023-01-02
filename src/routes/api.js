const express = require('express');
const router = express.Router();
const pool = require('../database'); // Connect DB
const helpers = require('../lib/helpers');

// Users

// Get all users
router.get('/api/users', async (req, res) => {
    const users = await pool.query('SELECT * FROM users');
    // console.log(users);
    (users) ? res.json(users): res.send(204);
});

// Get a specific user by username
router.get('/api/users/:username', async (req, res) => {
    // console.log(req.params);
    const userInfo = await pool.query('SELECT * FROM users WHERE username = ?', [req.params.username]);
    // console.log(userInfo);
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
        // console.log(sameId.total), console.log(sameUsername.total);      
        
        let lengthsCheck = helpers.maxLengthCheck(username, 16) && helpers.maxLengthCheck(password, 16) && helpers.maxLengthCheck(fullname, 100);
        if ((sameId.total + sameUsername.total != 0) && lengthsCheck) { // Cannot be an existent id or username   
            res.status(409).json({error: 'Conflict'});
        } else {
            password = await helpers.encryptPassword(password); // Encrypt password
            await pool.query('INSERT INTO users SET ? ', { id, username, password, fullname });
            res.status(201).json({status: 'Created'});; // 'Created'
        }
    } catch(err) {
        console.log(err);
        res.status(400).json({error: 'Bad Request'});
    }
    // https://stackoverflow.com/questions/3825990/http-response-code-for-post-when-resource-already-exists
});

// Update a user
router.put('/api/users/:username', async (req, res) => {
    try {
        // console.log(req.body);
        let { id, username, password, fullname } = req.body;
        const [dbId] = await pool.query('SELECT id FROM users WHERE username = ?', [username]); // Search id with req username value
        // console.log(dbId);
        const [usersWithThisId] = await pool.query('SELECT COUNT(*) as total FROM users WHERE id = ?', [id]); // Search amount of users with req id value
        // console.log(usersWithThisId.total);
        password = await helpers.encryptPassword(password); // Encrypt password

        // If the username mantains the same ID, or the new ID doesn't collide with another user's ID
        if((id == dbId.id) || (usersWithThisId.total == 0)) {
            await pool.query(`UPDATE users SET ? WHERE username = ?`, [{id, password, fullname}, username]);
            res.status(200).json({status: 'OK'});
        } else {
            res.status(409).json({error: 'Conflict'});
        }
    } catch(err) {
        console.log(err)
        res.status(400).json({error: 'Bad Request'});
    }
});

// Delete a user
router.delete('/api/users/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const [amount] = await pool.query('SELECT COUNT(*) as total FROM users WHERE username = ?', [username]);
        // Nothing to delete
        if(amount.total == 0) {
            res.status(204).json({status: 'No Content'});
        } 
        // Delete existent user
        else {
            await pool.query('DELETE FROM users WHERE username = ?', [username]);
            // TODO: Delete user's ideas 
            res.status(200).json({status: 'OK'});
        }
    } catch(err) {
        console.log(err)
        res.status(400).json({error: 'Bad Request'});
    }
});

// Ideas

module.exports = router;
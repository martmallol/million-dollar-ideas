const mysql = require('mysql');
const {promisify} = require('util'); // Support promises

const {database} = require('./keys');

// It connects with the database
const pool = mysql.createPool(database); // It's a place where connections get stored.
pool.getConnection((err, connection) => {
    // Validate errors
    if(err) {
        if(err.code == 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was CLOSED');
        }
        if(err.code == 'ER_CON_COUNT_ERROR') {
            console.error('Database has TOO MANY connections');
        }
        if(err.code == 'ECONNREFUSED') {
            console.error('Database connection was REFUSED');
        }
    }

    // Connection starts
    if(connection) connection.release();
    console.log('Database is CONNECTED');
    return;
});

// Every time I do a query, I can make a promise (callbacks -> promises)
pool.query = promisify(pool.query);

module.exports = pool;
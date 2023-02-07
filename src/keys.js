import {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME
} from './config.js'

module.exports = {
    database: {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME
    }
}
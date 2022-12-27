// Auth methods
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, username, password, done) => {
  
    const { fullname } = req.body;
    let newUser = {
      fullname,
      username,
      password
    };
    newUser.password = await helpers.encryptPassword(password); // Encrypt password

    // Saving in the Database
    const result = await pool.query('INSERT INTO users SET ? ', [newUser]);
    console.log(result);
    newUser.id = result.insertId;
    return done(null, newUser);
}));
  
// Serialize it (Save user session by saving its id)
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize it (first check if the user exists by taking its id and searching for its data)
passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  done(null, rows[0]);
});
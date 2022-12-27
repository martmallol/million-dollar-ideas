// Auth methods
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');

// Sign up
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

// Log in
passport.use('local.login', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  console.log(req.body);
  console.log(username);
  console.log(password);

  // Users with that username
  const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  // If it exists, check if the password submitted and the original one match
  if(rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(password, user.password);
    validPassword ? done(null, user, req.flash('success', `Welcome ${user.username}`))
                  : done(null, false, req.flash('message', 'Incorrect Password'));
  } 
  // If it does not exist, notice it.
  else {
    return done(null, false, req.flash('message', `This Username doesn't exist.`));
  }
}));
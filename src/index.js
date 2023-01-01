const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session'); // Store data in the server memory (necessary for flash to work)
const MySQLStore = require('express-mysql-session'); // Save session on DB instead of server memory
const passport = require('passport');

const { database } = require('./keys'); // My Project's DB

// Initialize express
const app = express();
require('./lib/passport');

// If the port exists, take it. If it doesn't, use 4000 as the port.
const PORT = process.env.PORT || 4000; // Cloud port or my port.

// Settings
app.set('views', path.join(__dirname, 'views')); // Where's the 'views' directory
app.engine('.hbs', exphbs.engine({ // Engine config
    defaultLayout: 'main', // main.hbs
    layoutsDir: path.join(app.get('views'), 'layouts'), // Where's layouts
    partialsDir: path.join(app.get('views'), 'partials'), // Where's partials
    extname: '.hbs', // Handlebar files extension
    helpers: require('./lib/handlebars') // Helpful functions
  }));
app.set('view engine', '.hbs');  // Utilize the previous engine
app.set('json spaces', 2); // Give spaces between json's braces

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); // It only accepts simple form inputs, not images
app.use(express.json()); // Send & receive jsons
app.use(session({ // Configure session
    secret: 'martmysqlsession',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database) // Store in my Project's DB
}));
app.use(flash()); // Middleware for sending messages
app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use((req, res, next) => {
    app.locals.success = req.flash("success");
    app.locals.message = req.flash("message");
    app.locals.user = req.user; // Now my 'user' variable can be accesed from any view
    next();
})

// Routes (urls of our server)
app.use(require('./routes')); // Import 'routes'
app.use(require('./routes/authentication')); // Import 'authentication'
app.use('/ideas', require('./routes/ideas')); // Import 'ideas'
app.use(require('./routes/api')); // Import 'api'



// Public
// Render css styles (solved by: https://forum.freecodecamp.org/t/loading-css-file-on-front-end-solved/25550/3)
app.use(express.static(path.join(__dirname, '/public')));


// Starting the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
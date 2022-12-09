const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');

// Initialize express
const app = express();

// If the port exists, take it. If it doesn't, use 4000 as the port.
const PORT = process.env.PORT ||4000;

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

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); // It only accepts simple form inputs, not images
app.use(express.json()); // Send & receive jsons

// Global variables
app.use((req, res, next) => {

    next();
})

// Routes (urls of our server)
app.use(require('./routes')); // Import 'routes'
app.use(require('./routes/authentication')); // Import 'authentication'
app.use('/links', require('./routes/links')); // Import 'links'

// Public

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
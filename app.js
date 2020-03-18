const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const events = [];

const app = express();
app.use(bodyParser.json());
// Passport Config
require('./DB/config/passport')(passport);

// DB Config
const db = require('./DB/config/keys').MongoURI;
const Buchung = require('./DB/models/Buchung');
const User = require('./DB/models/User');

// Connect to MongoDB
mongoose.connect(
    db,
    { useNewUrlParser: true }
)
    .then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use('/css', express.static('css') );

//express body parser
app.use(express.urlencoded({ extended: false}));
app.use(bodyParser.urlencoded({extended:true}));

// Express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});



//Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/buchungen', require('./routes/buchungen.js'));

app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/fonts'));
app.use('/images/', express.static('./images'));

const PORT = process.env.PORT || 80;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');


/*
const http = require('http');
const fs = require('fs'); */


const app = express();

//DB Config
const db = require('./Node_Passport_Login/config/keys').MongoURI;

//Connect do Mongo
mongoose.connect(db, { useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err=> console.log(err));

//EJS
app.use(expressLayouts);
app.use('/css', express.static('css') );
app.set('view engine', 'ejs');

//Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/fonts'));
app.use(express.static(__dirname + '/images'));

 /*
//Connection Server
var server = http.createServer(function (req,res) {
    console.log('requiest was made: ' + req.url);
    res.writeHead(200, {'Content-Type': 'text/html'});
    var myReadStream = fs.createReadStream(__dirname + '/Startseite_Mitarbeiter.html', 'utf8');
    myReadStream.pipe(res);
});

server.listen(3000, '127.0.0.1');
console.log('listening to port 3000');
*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

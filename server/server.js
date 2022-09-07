// express
var express = require('express');
var app = express();

// cors
var cors = require('cors');
app.use(cors());

// body parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var path = require('path');

app.use(express.static(__dirname + './../dist/chat'));
console.log(__dirname);

var http = require('http').Server(app);
var server = http.listen(3000, function() {
    console.log('Server listening in port: 3000...')
});

// endpoints
require("./routes/api.js")(app, path);
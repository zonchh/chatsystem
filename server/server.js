const PORT = 3000;

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

var http = require('http').Server(app);

var io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost: 3000",
        methods: ["GET", "POST"]
    }
});

app.use(express.static(__dirname + './../dist/chat'));
console.log(__dirname);

// endpoints
require("./routes/api.js")(app, path);
const server = require('./listen');
const sockets = require('./sockets');

sockets.connect(io, PORT);

server.listen(http, PORT);
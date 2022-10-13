// PORT Variable
const PORT = 3000;
// mongodb setup and connection
const {MongoClient, Collection} = require('mongodb');
// express
var express = require('express');
// cors
var cors = require('cors');
// body parser
var bodyParser = require('body-parser');
// path
var path = require('path');
// http
var http = require('http').Server(app);
// socket.io
var io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost: 3000",
        methods: ["GET", "POST"]
    }
});

const url = 'mongodb://localhost:27017';


var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static(__dirname + './../dist/chat'));
console.log(__dirname);

// endpoints
//connect sockets
const sockets = require('./sockets');
const server = require('./listen');

sockets.connect(io, PORT);
server.listen(app, PORT);


// connect Mongo Database
MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, client) {
    if (err) {
        return console.log(err);
    }

    const dbName="myDB";
    const db = client.db(dbName);

    //login route
    require('./routes/login.js')(db, app);

    // Routes for groups
    require('./routes/groups/getGroups.js')(db, app);
    require('./routes/groups/deleteGroups.js')(db, app);
    require('./routes/groups/addGroups.js')(db, app);

    // Routes for users
    require('./routes/users/addGroupsUsers.js')(db, app);
    require('./routes/users/addUsers.js')(db, app);
    require('./routes/users/deleteUsers.js')(db, app);
    require('./routes/users/deleteUsersChannels.js')(db, app);
    require('./routes/users/deleteUsersGroups.js')(db, app);
    require('./routes/users/getUsers.js')(db, app);

    // Routes for channels
    require('./routes/channels/addChannels.js')(db, app);
    require('./routes/channels/addUsersChannels.js')(db, app);
    require('./routes/channels/deleteChannels.js')(db, app);

});
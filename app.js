const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var path = require('path');
app.use(express.static(path.join(__dirname, '/public/dist/public')));

var session = require('express-session');
app.use(session({
    secret:"potato",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 600000}
}))

const server = app.listen(8000);
const io = require('socket.io')(server);
var players=0;
io.on('connection', function(socket) {
    socket.on('createGame', function(){
        console.log("Duel has been created");
        players = 0;
    });
    socket.on('joinGame', function(){
        console.log("Player joined")
        players+=1;
        if(players == 1){
            console.log("First player, waiting");
            socket.emit('waiting')
        }
        else if(players ==2){
            console.log("Second player, ready");
            io.emit('ready');
            console.log("sent messages");
        }
        else{
            socket.emit('chilling')
        }
    });
    socket.on('turn', function(info){
        console.log("Player did something");
        io.emit('sendAtk', info);
    })

});

require('./server/config/mongoose');
require('./server/config/routes')(app);
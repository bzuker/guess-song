require('dotenv').config();
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const Room = require('./src/Room');

server.listen(80, {}, _ => console.log('Listening on http://localhost:80'));

//var room = new Room(io, 'pop');
var toplistRoom = new Room(io, 'rock');

app.get('/', (req, res) => {
  res.send('Alive!');
});

// Someone joins the room. We should tell them:
// - the people who are there, with the current score for each.
// - the songs to play (all the info of current songs and past).

// On each correct guess we should update the score for that person.

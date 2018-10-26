require('dotenv').config();
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const playlists = require('./config');
const Room = require('./src/Room');

server.listen(80, {}, _ => console.log('Listening on http://localhost:80'));

const roomNames = Object.keys(playlists);
roomNames.forEach(name => new Room(io, name));

app.get('/', (req, res) => {
  res.send('Alive!');
});

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(80, {}, _ => console.log('Listening on port 80'));

app.get('/', (req, res) => {
  console.log('Request to /');
  res.send('Alive!');
});

io.on('connection', socket => {
  console.log('Someone has connected');
  socket.on('something', data => console.log(data));
});

// Someone joins the room. We should tell them:
// - the people who are there, with the current score for each.
// - the songs to play (all the info of current songs and past).

// On each correct guess we should update the score for that person.

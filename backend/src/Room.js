class Room {
  constructor(io, name) {
    this.io = io;
    this.name = name;
    this.tracks = [{ url: '', image: '', artists: [] }];
    this.playedTracks = [];
    this.currentTrack = {
      url: '',
      timeLeft: 30
    };
    this.users = [{ username: 'name', score: 10 }];

    this.init();
  }

  init() {
    // Set up the event listeners
    this.addEventListeners();

    // Get the tracks for the room
    this.getTracks();

    // Start the game
    this.startGame();
  }

  startGame() {
    // Emit game starting
  }

  getTracks() {
    // TODO
  }

  onAddUser(socket) {
    socket.on('add user', username => {
      console.log('add user called', username);
      socket.username = username;

      // Give the user the room info.
      socket.emit('login', 'room infoooooo'); // TODO

      // Tell everyone else someone joined the room
      socket.broadcast.emit('user joined', {
        username,
        score: 0
      });
    });
  }

  onCorrectGuess(socket) {
    socket.on('correct guess', (username, scoreToAdd) => {
      // Update user's score.

      // Tell everyone the new scores => (all users or just the one updated?)
      socket.emit('update score', {
        username,
        score: 10 + scoreToAdd
      });
    });
  }

  onDisconnect(socket) {
    // TODO: check what to do.
    socket.on('disconnect', _ => {
      socket.emit('remove user', socket.username);
    });
  }

  addEventListeners() {
    var room = this.io.of(`/${this.name}`);
    room.on('connection', socket => {
      console.log('connected to room ', this.name);
      this.onAddUser(socket);
      this.onCorrectGuess(socket);
      this.onDisconnect(socket);
    });
  }
}

module.exports = Room;

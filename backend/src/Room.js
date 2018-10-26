const s = require('../lib/spotify');

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

  async init() {
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

  async getTracks() {
    // If the access token is not set, wait and retry.
    if (!s.getAccessToken()) {
      setTimeout(_ => this.getTracks(), 3000);
      return;
    }

    // const response = await s.getCategoryPlaylists(category);
    // const playlists = response.playlists.items;
    // const randomPlaylist = getRandomItem(playlists);
    // const tracksResponse = await s.getPlaylistTracks(randomPlaylist.id);
    // const tracks = tracksResponse.items.filter(x => x.track);
    // const playableTracks = tracks.filter(x => x.track.preview_url);
  }

  getRoomInfo() {
    return {
      playedTracks: this.playedTracks,
      currentTrack: this.currentTrack,
      users: this.users
    };
  }

  onAddUser(socket) {
    socket.on('add user', username => {
      console.log('add user called', username);
      console.log({ name: this.name, socket: socket.nsp.name });
      socket.username = username;

      // Give the user the room info.
      socket.emit('login', username, this.getRoomInfo());

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
      console.log('disconnect called');
      socket.emit('remove user', socket.username);
    });
  }

  addEventListeners() {
    var room = this.io.of(`/${this.name}`);
    //console.log({ room });
    room.on('connection', socket => {
      console.log(
        `connected to room ${this.name}. SocketID: ${socket.id}. Namespace: ${socket.nsp.name}`
      );
      this.onAddUser(socket);
      this.onCorrectGuess(socket);
      this.onDisconnect(socket);
    });
  }
}

module.exports = Room;

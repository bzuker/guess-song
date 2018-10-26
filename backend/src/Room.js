const s = require('../lib/spotify');
const getRandomItem = array => array[Math.floor(Math.random() * array.length)];

class Room {
  constructor(io, name) {
    this.name = name;
    this.room = io.of(`/${this.name}`);
    this.tracks = [];
    this.playedTracks = [];
    this.currentTrack = null;
    this.users = [];

    this.init();
  }

  async init() {
    // If the access token is not set, wait and retry.
    if (!s.getAccessToken()) {
      setTimeout(_ => this.init(), 3000);
      return;
    }

    // Set up the event listeners
    this.addEventListeners();

    // Get the tracks for the room
    await this.getTracks();

    // Start the game
    this.loadTrack();
  }

  loadTrack() {
    // TODO: check if the game should be over.

    this.setNextTrack();
    console.log('Loading track...');
    this.room.emit('load track', this.getRoomInfo());

    // We wait 5s and start playing the track
    setTimeout(_ => this.playTrack(), 6000);
  }

  playTrack() {
    console.log('Play track');
    this.room.emit('play track');

    // We play the song for 15s and load the next one
    setTimeout(_ => this.loadTrack(), 15500);
  }

  setNextTrack() {
    const newTrack = getRandomItem(this.tracks);
    this.tracks = this.tracks.filter(x => x.id !== newTrack.id);
    this.playedTracks = this.currentTrack ? [...this.playedTracks, this.currentTrack] : [];
    this.currentTrack = newTrack;
  }

  async getTracks() {
    const { body } = await s.searchPlaylists(`${this.name}`, { limit: 10 });
    const playlists = body.playlists.items;
    const randomPlaylist = getRandomItem(playlists);
    const tracksResponse = await s.getPlaylistTracks(randomPlaylist.id);
    const tracks = tracksResponse.body.items.filter(x => x.track);
    const playableTracks = tracks.filter(x => x.track.preview_url).map(x => x.track);
    this.tracks = playableTracks;
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
    this.room.on('connection', socket => {
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

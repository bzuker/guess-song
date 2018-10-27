const s = require('../lib/spotify');
const playlists = require('../config');
const getRandomItem = array => array[Math.floor(Math.random() * array.length)];
const alreadyPlayedArtist = (songs, song) => {
  try {
    const playedArtists = songs.map(x => x.artists[0].id);
    const artist = song.artists[0].id;
    return playedArtists.includes(artist);
  } catch (error) {
    console.log(error, { songs, song });
    return false;
  }
};
const SONG_TIME = 15000;

class Room {
  constructor(io, name) {
    this.name = name;
    this.room = io.of(`/${this.name}`);
    this.tracks = [];
    this.playedTracks = [];
    this.currentTrack = null;
    this.isPlaying = false;
    this.timeLeft = SONG_TIME;
    this.users = [];

    this.init();
  }

  async init() {
    // If the access token is not set, wait and retry.
    if (!s.getAccessToken()) {
      setTimeout(_ => this.init(), 1000);
      return;
    }

    // Set up the event listeners
    this.addEventListeners();

    // Get the tracks for the room
    this.tracks = await this.getTracks();
    console.log(this.tracks);
    if (this.tracks.length <= 15) {
      const moreTracks = await this.getTracks();
      this.tracks = [...this.tracks, moreTracks];
    }

    // Start the game
    this.loadTrack();
  }

  loadTrack() {
    // TODO: check if the game should be over.

    console.log('Loading track...');
    this.setNextTrack();
    this.isPlaying = false;
    this.room.emit('load track', this.getRoomInfo());

    // We wait 5s and start playing the track
    setTimeout(_ => this.playTrack(), 6000);
  }

  playTrack() {
    console.log(`Play track ${this.currentTrack.name}`);
    this.isPlaying = true;
    this.timeLeft = SONG_TIME;
    this.startTimer();
    this.room.emit('play track', this.getRoomInfo());

    // We play the song for 15s and load the next one
    setTimeout(_ => this.loadTrack(), SONG_TIME + 500);
  }

  startTimer(delay = 50) {
    let interval = setInterval(_ => {
      this.timeLeft = this.timeLeft - delay;

      if (this.timeLeft < delay) {
        clearInterval(interval);
      }
    }, delay);
  }

  setNextTrack() {
    const newTrack = getRandomItem(this.tracks);

    if (!newTrack) {
      console.log({ tracks: this.tracks });
    }

    if (alreadyPlayedArtist(this.playedTracks, newTrack)) {
      this.setNextTrack();
      return;
    }

    this.tracks = this.tracks.filter(x => x.id !== newTrack.id);
    this.playedTracks = this.currentTrack
      ? [...this.playedTracks, this.currentTrack]
      : [];
    this.currentTrack = newTrack;
  }

  async getTracks() {
    const randomPlaylistId = getRandomItem(playlists[this.name]);
    const offset = Math.floor(Math.random() * 1000);
    const tracksResponse = await s.getPlaylistTracks(randomPlaylistId, {
      offset
    });
    const tracks = tracksResponse.body.items.filter(x => x.track);
    // We didn't get any tracks, try again.
    if (tracks.length === 0) {
      return await this.getTracks();
    }

    const playableTracks = tracks
      .filter(x => x.track.preview_url)
      .map(x => x.track);

    return playableTracks;
  }

  getRoomInfo() {
    return {
      playedTracks: this.playedTracks,
      currentTrack: this.currentTrack,
      users: this.users,
      isPlaying: this.isPlaying,
      timeLeft: this.timeLeft
    };
  }

  onAddUser(socket) {
    socket.on('add user', username => {
      console.log('add user called', username);
      socket.username = username;
      const newUser = { name: username, score: 0 };
      this.users = [...this.users, newUser];

      // Give the user the room info.
      socket.emit('login', newUser, this.getRoomInfo());

      // Tell everyone else someone joined the room
      socket.broadcast.emit('user joined', this.users);
    });
  }

  onCorrectGuess(socket) {
    socket.on('correct guess', (username, guessType) => {
      console.log({ username, guessType });
      // Update user's score.
      let user = this.users.find(x => x.name === username);
      const scoreToAdd = guessType === 'name' ? 2 : 1;
      user.score = user.score + scoreToAdd;

      // Tell everyone the new scores.
      this.room.emit('update score', this.users);
    });
  }

  onDisconnect(socket) {
    // TODO: check what to do.
    socket.on('disconnect', _ => {
      console.log('disconnect called');
      this.users = this.users.filter(x => x.name !== socket.username);
      socket.broadcast.emit('user left', this.users);
    });
  }

  addEventListeners() {
    this.room.on('connection', socket => {
      console.log(
        `Connected to room ${this.name}. SocketID: ${socket.id}. Namespace: ${
          socket.nsp.name
        }`
      );
      this.onAddUser(socket);
      this.onCorrectGuess(socket);
      this.onDisconnect(socket);
    });
  }
}

module.exports = Room;

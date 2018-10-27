const s = require('../lib/spotify');
const config = require('../config');
const getShuffledArray = arr => {
  let newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
};
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

    await this.getTracks();

    // Start the game
    this.loadTrack();
  }

  restartGame() {
    this.currentTrack = null;
    this.playedTracks = [];
    this.getTracks();
    setTimeout(_ => this.loadTrack(), 10000);
  }

  loadTrack() {
    this.playedTracks = this.currentTrack ? [...this.playedTracks, this.currentTrack] : [];
    this.isPlaying = false;

    // Check if the game is over.
    if (this.playedTracks.length === 9) {
      this.room.emit('game over', this.getRoomInfo());
      this.restartGame();
      return;
    }

    this.setNextTrack();
    this.room.emit('load track', this.getRoomInfo());
    console.log('Loading track...');

    // We wait 5s and start playing the track
    setTimeout(_ => this.playTrack(), 6000);
  }

  playTrack() {
    console.log(`Play track ${this.currentTrack.name} - ${this.currentTrack.artists[0].name}`);
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
    const newTrack = this.tracks[0];
    this.tracks = this.tracks.filter(x => x.id !== newTrack.id);

    if (alreadyPlayedArtist(this.playedTracks, newTrack)) {
      this.setNextTrack();
      return;
    }

    this.currentTrack = newTrack;
  }

  async getTracks() {
    const randomArtists = getShuffledArray(config.artists[this.name]).slice(0, 2); // getRandomItem(config.artists[this.name]);
    const response = await s.getRecommendations({
      min_popularity: 50,
      seed_artists: randomArtists,
      limit: 100
    });
    const { tracks } = response.body;
    const playableTracks = tracks
      .filter(x => x.preview_url)
      .sort((a, b) => b.popularity - a.popularity);

    console.log(`For ${this.name} we have ${playableTracks.length} tracks.`);
    this.tracks = playableTracks;
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
      // TODO: Check that the username is not in use.

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
        `Connected to room ${this.name}. SocketID: ${socket.id}. Namespace: ${socket.nsp.name}`
      );
      this.onAddUser(socket);
      this.onCorrectGuess(socket);
      this.onDisconnect(socket);
    });
  }
}

module.exports = Room;

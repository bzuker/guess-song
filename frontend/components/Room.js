import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Player from '../components/Player';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import green from '@material-ui/core/colors/green';
import CurrentScore from '../components/CurrentScore';
import SongList from '../components/SongList';
import UserList from '../components/UserList';
import AskUsername from '../components/AskUsername';
import match from '../src/match';

const getRandomItem = array => array[Math.floor(Math.random() * array.length)];

const styles = theme => ({
  form: {
    marginTop: '20px',
    padding: '15px'
  },
  userList: {
    marginBottom: '15px'
  },
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.secondary.dark
  }
});

class Room extends Component {
  static PLAY_TIME = 15000;
  static COUNTDOWN = 5;
  state = {
    isPlaying: false,
    countdown: Room.COUNTDOWN,
    timeLeft: Room.PLAY_TIME,
    tracks: [],
    playedTracks: [],
    track: null,
    guess: '',
    guessedArtist: false,
    guessedTrack: false,
    score: 0,
    username: null,
    toast: {}
  };

  componentDidMount = _ => {
    this.getTracks();
    this.startCountdown();
  };

  componentWillUnmount = _ => {
    clearInterval(this.countdownId);
    clearInterval(this.songInterval);
  };

  startPlayTrack = _ => {
    this.setNextTrack();
    // Every track plays for Room.PLAY_TIME seconds
    this.setState({ isPlaying: true, timeLeft: Room.PLAY_TIME });

    this.songInterval = setInterval(_ => {
      // When the time ends, we start the countdown.
      if (this.state.timeLeft < 0) {
        clearInterval(this.songInterval);
        this.setState({ isPlaying: false });

        // If we played 10 tracks, the game is over.
        if (this.state.playedTracks.length === 9) {
          this.gameOver();
          return;
        }

        this.startCountdown();
        return;
      }

      this.setState(state => ({ ...state, timeLeft: state.timeLeft - 250 }));
    }, 250);
  };

  startCountdown = _ => {
    this.setState({ countdown: Room.COUNTDOWN });

    this.countdownId = setInterval(_ => {
      // When the countdown ends, we start playing
      if (this.state.countdown < 1) {
        clearInterval(this.countdownId);
        this.startPlayTrack();
        return;
      }

      this.setState(state => ({ ...state, countdown: state.countdown - 1 }));
    }, 1000);
  };

  gameOver = _ => {
    console.log('Game over, do something.');
  };

  async getTracks() {
    const { category } = this.props;
    const response = await s.getCategoryPlaylists(category);
    const playlists = response.playlists.items;
    const randomPlaylist = getRandomItem(playlists);
    const tracksResponse = await s.getPlaylistTracks(randomPlaylist.id);
    const tracks = tracksResponse.items.filter(x => x.track);
    const playableTracks = tracks.filter(x => x.track.preview_url);
    this.setState({
      tracks: playableTracks.map(x => x.track)
    });
  }

  handleLogin = username => {
    this.setState({ username });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = evt => {
    // Check if the guess matches song or artist.
    evt.preventDefault();

    const { guess, track, guessedArtist, guessedTrack, isPlaying } = this.state;

    // Can't guess if there is no song
    if (!isPlaying) {
      this.setState({
        toast: { text: 'Esperá que empiece la canción!', status: 'info' },
        guess: ''
      });
      return;
    }

    // Already guessed.
    if (guessedTrack && guessedArtist) {
      this.setState({
        toast: {
          text: 'Ya adivinaste! Esperá la próxima canción',
          status: 'info'
        },
        guess: ''
      });
      return;
    }

    // If it matches the track name (and hasn't guessed yet) we award 2 points
    if (!guessedTrack && match(this.state.track.name, guess)) {
      this.setState(state => ({
        ...state,
        toast: {
          text: guessedArtist ? '+2. Excelente!' : '+2. Bien! Y quién canta?',
          status: 'success'
        },
        score: state.score + 2,
        guess: '',
        guessedTrack: true
      }));

      return;
    }

    // If it matches one of the artists (and hasn't guessed yet), we award 1 point
    if (!guessedArtist && track.artists.some(x => match(x.name, guess))) {
      this.setState(state => ({
        ...state,
        toast: {
          text: guessedTrack ? '+1. Excelente!' : '+1. Bien! Y qué canción es?',
          status: 'success'
        },
        score: state.score + 1,
        guess: '',
        guessedArtist: true
      }));

      return;
    }

    // Matches nothing
    this.setState(state => ({
      ...state,
      toast: { text: 'No.. probá de nuevo.', status: 'error' },
      guess: ''
    }));
  };

  setNextTrack = _ => {
    this.setState(state => {
      const newTrack = getRandomItem(state.tracks);
      return {
        ...state,
        tracks: state.tracks.filter(x => x.id !== newTrack.id),
        playedTracks: state.track ? [...state.playedTracks, state.track] : [],
        track: newTrack,
        guess: '',
        guessedArtist: false,
        guessedTrack: false
      };
    });
  };

  render() {
    const {
      track,
      timeLeft,
      playedTracks,
      score,
      isPlaying,
      countdown,
      toast,
      username
    } = this.state;
    const { classes, addUser } = this.props;
    return (
      <React.Fragment>
        <AskUsername open={!username} onSubmit={addUser} />
        <Snackbar
          open={Boolean(toast.status)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          ContentProps={{ className: classes[toast.status] }}
          message={toast.text}
          onClose={_ => this.setState({ toast: {} })}
          autoHideDuration={2000}
        />
        <Grid item xs={12} sm={12} md={3} lg={2}>
          <CurrentScore title="Info del juego" playedTracks={playedTracks.length} score={score} />
        </Grid>
        <Grid item xs={12} sm={7} md={5} lg={7}>
          <Player track={track} isPlaying={isPlaying} timeLeft={timeLeft} countdown={countdown} />
          <Paper className={classes.form}>
            <Typography variant="h6" component="h5">
              Quién canta?
            </Typography>
            <Typography>
              {this.state.track
                ? `${this.state.track.name} - ${this.state.track.artists
                    .map(x => x.name)
                    .join(', ')}`
                : ''}
            </Typography>
            <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
              <TextField
                id="guess"
                label="Adiviná el nombre de la canción o del artista"
                className={classes.textField}
                value={this.state.guess}
                onChange={this.handleChange('guess')}
                fullWidth
                autoFocus
              />
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={5} md={4} lg={3}>
          <UserList
            className={classes.userList}
            title="Usuarios jugando"
            users={[{ name: 'Brian' }, { name: 'Jorge' }]}
          />
          <SongList title="Canciones escuchadas" songs={playedTracks} />
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Room);

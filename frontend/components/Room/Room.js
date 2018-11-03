import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Player from './Player';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import green from '@material-ui/core/colors/green';
import classNames from 'classnames'
import CurrentScore from './CurrentScore';
import SongList from './SongList';
import UserList from './UserList';
import AskUsername from './AskUsername';
import GameOverDialog from './GameOverDialog';
import match from '../../src/match';
import feedback from './feedback'

const getRandomItem = array => array[Math.floor(Math.random() * array.length)];
const styles = theme => ({
  scoreContainer: {
    [theme.breakpoints.down('sm')]: {
      order: 2
    }
  },
  playerContainer: {
    [theme.breakpoints.down('sm')]: {
      order: 1
    }
  },
  songsContainer: {
    [theme.breakpoints.down('sm')]: {
      order: 3
    }
  },
  form: {
    marginBottom: '20px',
    padding: '15px'
  },
  shake: {
      animation: 'shake 0.7s cubic-bezier(.36,.07,.19,.97) both',
      transform: 'translate3d(0, 0, 0)'
  },
  '@keyframes shake': {
    '10%, 90%': {
      transform: 'translate3d(-1px, 0, 0)'
    },
    '20%, 80%': {
      transform: 'translate3d(2px, 0, 0)'
    },
    '30%, 50%, 70%': {
      transform: 'translate3d(-4px, 0, 0)'
    },
    '40%, 60%': {
      transform: 'translate3d(4px, 0, 0)'
    }
  },
  userList: {
    marginTop: '15px'
  },
  success: {
    color: green[700]
  },
  error: {
    color: theme.palette.error.dark
  },
  info: {
    color: 'inherit'
  },
  bold: {
    fontWeight: '500'
  }
});

class Room extends Component {
  static INITIAL_STATE = {
    guess: '',
    guessedArtist: false,
    guessedTrack: false,
    feedback: {
      text: 'Adiviná el nombre del tema o quién canta',
      status: 'info'
    }
  }

  state = Room.INITIAL_STATE

  componentDidUpdate = (prevProps, prevState) => {
    const lastTrack = prevProps.currentTrack;
    const { currentTrack } = this.props;
    if (lastTrack && currentTrack.id !== lastTrack.id) {
      console.log('Resetting state.');
      this.resetState();
    }
  };

  resetState = _ => this.setState(Room.INITIAL_STATE);

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = evt => {
    // Check if the guess matches song or artist.
    evt.preventDefault();

    const { isPlaying, currentTrack, currentUser } = this.props;
    const { guess, guessedArtist, guessedTrack } = this.state;

    // Can't guess if there is no song
    if (!isPlaying) {
      this.setState({
        feedback: { text: 'Esperá que empiece la canción!', status: 'info' },
        guess: ''
      });
      return;
    }

    // Already guessed.
    if (guessedTrack && guessedArtist) {
      this.setState({
        feedback: {
          text: 'Ya adivinaste! Esperá la próxima canción',
          status: 'info'
        },
        guess: ''
      });
      return;
    }

    // If it matches the track name (and hasn't guessed yet).
    if (!guessedTrack && match(currentTrack.name, guess)) {
      this.props.onCorrectGuess(currentUser.name, 'name');
      this.setState(state => ({
        ...state,
        feedback: {
          text: guessedArtist ? getRandomItem(feedback.positiveBoth) : getRandomItem(feedback.positiveSong),
          status: 'success'
        },
        guess: '',
        guessedTrack: true
      }));

      return;
    }

    // If it matches one of the artists (and hasn't guessed yet).
    if (!guessedArtist && currentTrack.artists.some(x => match(x.name, guess))) {
      this.props.onCorrectGuess(currentUser.name, 'artist');
      this.setState(state => ({
        ...state,
        feedback: {
          text: guessedTrack ? getRandomItem(feedback.positiveBoth) : getRandomItem(feedback.positiveArtist),
          status: 'success'
        },
        guess: '',
        guessedArtist: true
      }));

      return;
    }

    // Matches nothing
    this.setState(state => ({
      ...state,
      feedback: { text: getRandomItem(feedback.negative), status: 'error' },
      guess: ''
    }));

    setTimeout(() => {
      this.setState(state => ({...state, feedback: {text: state.feedback.text, status: ''}}))
    }, 1500);
  };

  render() {
    const { feedback } = this.state;
    const {
      classes,
      addUser,
      isPlaying,
      currentTrack,
      playedTracks,
      timeLeft,
      countdown,
      currentUser,
      users,
      gameOver
    } = this.props;

    const currentUserScore = currentUser ? users.find(x => x.name === currentUser.name).score : 0;
    return (
      <React.Fragment>
        <AskUsername open={!currentUser} onSubmit={addUser} />
        <GameOverDialog open={gameOver} users={users} />
        <Grid className={classes.scoreContainer} item xs={12} sm={12} md={3} lg={2}>
          <CurrentScore
            title="Info del juego"
            playedTracks={playedTracks.length}
            score={currentUserScore}
          />
          <UserList className={classes.userList} title="Usuarios jugando" users={users} />
        </Grid>
        <Grid className={classes.playerContainer} item xs={12} sm={7} md={5} lg={7}>
          <Paper className={classes.form}>
            <Typography className={classNames(classes.bold, classes[feedback.status])} variant="body1" align="center" gutterBottom>
              {feedback.text}
            </Typography>
            <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
              <TextField
                id="guess"
                label="Canción o artista"
                className={feedback.status === 'error' ? classes.shake : null}
                value={this.state.guess}
                onChange={this.handleChange('guess')}
                fullWidth
                autoFocus
                error={feedback.status === 'error'}
              />
            </form>
          </Paper>
          <Player
            track={currentTrack}
            isPlaying={isPlaying}
            timeLeft={timeLeft}
            countdown={countdown}
          />
        </Grid>
        <Grid className={classes.songsContainer} item xs={12} sm={5} md={4} lg={3}>
          <SongList title="Canciones escuchadas" songs={playedTracks} />
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Room);

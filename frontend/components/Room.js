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

const styles = theme => ({
  form: {
    marginTop: '20px',
    padding: '15px'
  },
  userList: {
    marginTop: '15px'
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
  state = {
    guess: '',
    guessedArtist: false,
    guessedTrack: false,
    toast: {}
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = evt => {
    // Check if the guess matches song or artist.
    evt.preventDefault();

    const { isPlaying, currentTrack } = this.props;
    const { guess, guessedArtist, guessedTrack } = this.state;

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
    if (!guessedTrack && match(currentTrack.name, guess)) {
      this.setState(state => ({
        ...state,
        toast: {
          text: guessedArtist ? '+2. Excelente!' : '+2. Bien! Y quién canta?',
          status: 'success'
        },
        guess: '',
        guessedTrack: true
      }));

      return;
    }

    // If it matches one of the artists (and hasn't guessed yet), we award 1 point
    if (!guessedArtist && currentTrack.artists.some(x => match(x.name, guess))) {
      this.setState(state => ({
        ...state,
        toast: {
          text: guessedTrack ? '+1. Excelente!' : '+1. Bien! Y qué canción es?',
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
      toast: { text: 'No.. probá de nuevo.', status: 'error' },
      guess: ''
    }));
  };

  render() {
    const { toast } = this.state;
    const {
      classes,
      addUser,
      isPlaying,
      currentTrack,
      playedTracks,
      timeLeft,
      countdown,
      currentUser,
      users
    } = this.props;
    return (
      <React.Fragment>
        <AskUsername open={!currentUser} onSubmit={addUser} />
        <Snackbar
          open={Boolean(toast.status)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          ContentProps={{ className: classes[toast.status] }}
          message={toast.text}
          onClose={_ => this.setState({ toast: {} })}
          autoHideDuration={2000}
        />
        <Grid item xs={12} sm={12} md={3} lg={2}>
          <CurrentScore
            title="Info del juego"
            playedTracks={playedTracks.length}
            score={currentUser ? currentUser.score : 0}
          />
          <UserList className={classes.userList} title="Usuarios jugando" users={users} />
        </Grid>
        <Grid item xs={12} sm={7} md={5} lg={7}>
          <Player
            track={currentTrack}
            isPlaying={isPlaying}
            timeLeft={timeLeft}
            countdown={countdown}
          />
          <Paper className={classes.form}>
            <Typography variant="h6" component="h5">
              Quién canta?
            </Typography>
            <Typography>
              {currentTrack
                ? `${currentTrack.name} - ${currentTrack.artists.map(x => x.name).join(', ')}`
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
          <SongList title="Canciones escuchadas" songs={playedTracks} />
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Room);

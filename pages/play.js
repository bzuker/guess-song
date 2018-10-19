import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Player from '../components/Player';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import s from '../src/spotifyApi';
import CurrentScore from '../components/CurrentScore';
import SongList from '../components/SongList';
import UserList from '../components/UserList';
import match from '../src/match';

const getRandomItem = array => array[Math.floor(Math.random() * array.length)];

const styles = theme => ({
  form: {
    marginTop: '20px',
    padding: '15px'
  },
  userList: {
    marginBottom: '15px'
  }
});

class Play extends Component {
  state = {
    timeLeft: 150,
    tracks: [],
    playedTracks: [],
    track: null,
    guess: '',
    guessedArtist: false,
    guessedTrack: false,
    score: 0
  };

  componentDidMount = () => {
    this.getTrack();
    this.startCountdown();
  };

  componentWillUnmount = () => {
    clearInterval(this.intervalId);
  };

  startCountdown = _ => {
    this.intervalId = setInterval(() => {
      this.setState(state => ({ ...state, timeLeft: state.timeLeft - 1 }));
    }, 100);
  };

  async getTrack() {
    const { category } = this.props.router.query;
    const response = await s.getCategoryPlaylists(category);
    const playlists = response.playlists.items;
    const randomPlaylist = getRandomItem(playlists);
    const tracksResponse = await s.getPlaylistTracks(randomPlaylist.id);
    const tracks = tracksResponse.items.filter(x => x.track);
    const playableTracks = tracks.filter(x => x.track.preview_url);
    const track = getRandomItem(playableTracks).track;
    this.setState({
      tracks: playableTracks.filter(x => x.track.id !== track.id).map(x => x.track),
      track
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    // Check if the guess matches song or artist.
    const { guess, track, guessedArtist, guessedTrack } = this.state;

    // If it matches the track name (and hasn't guessed yet) we award 2 points
    if (!guessedTrack && match(this.state.track.name, guess)) {
      this.setState(state => ({ ...state, score: state.score + 2, guess: '', guessedTrack: true }));
    }

    // If it matches one of the artists (and hasn't guessed yet), we award 1 point
    if (!guessedArtist && track.artists.some(x => match(x.name, guess))) {
      this.setState(state => ({
        ...state,
        score: state.score + 1,
        guess: '',
        guessedArtist: true
      }));
    }
  };

  nextTrack = _ => {
    this.setState(state => {
      const newTrack = getRandomItem(state.tracks);
      return {
        ...state,
        tracks: state.tracks.filter(x => x.id !== newTrack.id),
        track: newTrack,
        playedTracks: [...state.playedTracks, state.track],
        guess: '',
        guessedArtist: false,
        guessedTrack: false
      };
    });
  };

  render() {
    const { track, timeLeft, playedTracks, score } = this.state;
    const { classes } = this.props;
    console.log({ timeLeft });
    return (
      <React.Fragment>
        <Grid item xs={12} sm={12} md={3} lg={2}>
          <CurrentScore
            title="Info del juego"
            timeLeft={timeLeft}
            playedTracks={playedTracks.length}
            score={score}
          />
        </Grid>
        <Grid item xs={12} sm={7} md={5} lg={7}>
          <Player track={track} />
          <button onClick={this.nextTrack}>Next track</button>
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
          <SongList title="Canciones escuchadas" songs={this.state.playedTracks} />
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(Play));

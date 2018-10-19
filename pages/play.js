import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Player from '../components/Player';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import s from '../src/spotifyApi';
import SongList from '../components/SongList';
import match from '../src/match';

const getRandomItem = array => array[Math.floor(Math.random() * array.length)];

const styles = theme => ({
  form: {
    marginTop: '20px',
    padding: '15px'
  }
});

class Play extends Component {
  state = {
    tracks: [],
    playedTracks: [],
    track: null,
    guess: ''
  };

  componentDidMount = () => {
    this.getTrack();
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
    const { guess, track } = this.state;
    console.log('Match name', match(this.state.track.name, guess));
    track.artists.forEach(x => console.log('Match artist', match(x.name, guess)));
  };

  nextTrack = _ => {
    this.setState(state => {
      const newTrack = getRandomItem(state.tracks);
      return {
        ...state,
        tracks: state.tracks.filter(x => x.id !== newTrack.id),
        track: newTrack,
        playedTracks: [...state.playedTracks, state.track]
      };
    });
  };

  render() {
    const { track, tracks } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid item xs={12} sm={7} md={8} lg={9}>
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
                    .join(',')}`
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
          <SongList title="Canciones escuchadas" songs={this.state.playedTracks} />
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(Play));

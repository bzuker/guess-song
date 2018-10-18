import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import AudioSpectrum from 'react-audio-spectrum';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import s from '../src/spotifyApi';

const styles = theme => ({
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  playBtn: {
    position: 'absolute'
  }
});

class Player extends Component {
  audioEl = React.createRef();
  state = {
    isPlaying: false,
    track: null
  };

  componentDidMount() {
    this.getTrack();
  }

  async getTrack() {
    const { category } = this.props;
    const response = await s.getCategoryPlaylists(category);
    const playlists = response.playlists.items;
    const randomPlaylist = playlists[Math.floor(Math.random() * playlists.length)];
    const tracksResponse = await s.getPlaylistTracks(randomPlaylist.id);
    const tracks = tracksResponse.items;
    const playableTracks = tracks.filter(x => x.track.preview_url);
    const track = playableTracks[Math.floor(Math.random() * playableTracks.length)].track;
    this.setState({ track });
  }

  play() {
    this.setState({ isPlaying: true });
    this.audioEl.current.play();

    setTimeout(_ => this.stop(), 3000);
  }

  stop() {
    this.setState({ isPlaying: false });
    this.audioEl.current.pause();
    this.audioEl.current.currentTime = 0;
  }
  render() {
    const { track, isPlaying } = this.state;
    const { classes } = this.props;
    if (!track) {
      return <div>Loading</div>;
    }

    return (
      <Card className={classes.card} raised>
        {!isPlaying ? (
          <IconButton className={classes.playBtn} aria-label="Play">
            <PlayArrowIcon onClick={_ => this.play()} />
          </IconButton>
        ) : null}
        <audio id="track" crossOrigin="anonymous" src={track.preview_url} ref={this.audioEl}>
          Your browser does not support the <code>audio</code> element.
        </audio>
        <AudioSpectrum
          id="audio-canvas"
          height={200}
          width={600}
          audioId={'track'}
          capColor={'red'}
          capHeight={2}
          meterWidth={2}
          meterCount={512}
          meterColor={[
            { stop: 0, color: '#f00' },
            { stop: 0.5, color: '#0CD7FD' },
            { stop: 1, color: 'red' }
          ]}
          gap={4}
        />
      </Card>
    );
  }
}

export default withStyles(styles)(Player);

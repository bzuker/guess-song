import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PlayIcon from '@material-ui/icons/PlayArrow';

const styles = theme => ({
  playBtn: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    'z-index': '100'
  }
});

class Player extends Component {
  state = {
    isMobile: false,
    hasPlayed: false
  };

  componentDidMount = () => {
    this.audioEl = new Audio();
    this.audioEl.crossOrigin = 'anonymous';
    if (window.innerWidth < 800) {
      this.setState({ isMobile: true });
    }
  };

  componentDidUpdate(prevProps) {
    const { isPlaying, track } = this.props;

    if (!prevProps.track || prevProps.track.id !== track.id) {
      this.audioEl.src = track && track.preview_url;
    }

    if (isPlaying) {
      this.play();
    } else {
      this.stop();
    }
  }

  mobilePlay() {
    this.setState({ hasPlayed: true });
    this.audioEl.play();
  }

  play() {
    if (this.state.isMobile && !this.state.hasPlayed) return;
    console.log('playing!!');
    this.audioEl.play();
  }

  stop() {
    this.audioEl.pause();
    this.audioEl.currentTime = 0;
  }
  render() {
    const { track, classes, isPlaying } = this.props;

    return track ? (
      this.state.isMobile && !this.state.hasPlayed && isPlaying ? (
        <Button
          variant="extendedFab"
          className={classes.playBtn}
          onClick={_ => this.mobilePlay()}
        >
          <PlayIcon />
          Jugar
        </Button>
      ) : null
    ) : null;
  }
}

export default withStyles(styles)(Player);

import React, { Component } from 'react';
import AudioSpectrum from 'react-audio-spectrum';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import PlayIcon from '@material-ui/icons/PlayArrow';

const styles = theme => ({
  paper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100px'
  },
  avatar: {
    position: 'absolute',
    backgroundColor: theme.palette.secondary.main
  },
  playBtn: {
    position: 'absolute'
  }
});

class Player extends Component {
  state = {
    isMobile: false,
    hasPlayed: false
  };
  // audioEl = React.createRef();

  componentDidMount = () => {
    this.audioEl = new Audio();
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
    this.audioEl.play();
    // if (!this.audioEl.current || (this.state.isMobile && !this.state.hasPlayed)) return;
    // this.audioEl.current.play();
  }

  stop() {
    // if (!this.audioEl.current) return;
    this.audioEl.pause();
    this.audioEl.currentTime = 0;
  }
  render() {
    const { track, classes, timeLeft, isPlaying, countdown } = this.props;

    return (
      <React.Fragment>
        {isPlaying ? (
          <LinearProgress value={(timeLeft * 100) / 15000} variant="determinate" />
        ) : null}
        <Paper className={classes.paper}>
          {track ? (
            <React.Fragment>
              {this.state.isMobile ? (
                <IconButton
                  className={classes.playBtn}
                  aria-label="Play"
                  onClick={_ => this.mobilePlay()}>
                  <PlayIcon />
                </IconButton>
              ) : null}
              {/* <audio
                id="track"
                crossOrigin="anonymous"
                src={track.preview_url}
                //ref={this.audioEl}
              >
                Your browser does not support the <code>audio</code> element.
              </audio> */}
              {/* <AudioSpectrum
                id="audio-canvas"
                height={100}
                width={window.innerWidth > 1300 ? 500 : 300}
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
              /> */}
            </React.Fragment>
          ) : null}
          {!isPlaying ? <Avatar className={classes.avatar}>{Math.round(countdown)}</Avatar> : null}
        </Paper>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Player);

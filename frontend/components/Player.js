import React, { Component } from 'react';
import AudioSpectrum from 'react-audio-spectrum';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Avatar from '@material-ui/core/Avatar';

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
  }
});

class Player extends Component {
  audioEl = React.createRef();

  componentDidUpdate() {
    const { isPlaying } = this.props;
    if (isPlaying) {
      this.play();
    } else {
      this.stop();
    }
  }

  play() {
    if (!this.audioEl.current) return;
    this.audioEl.current.play();
  }

  stop() {
    if (!this.audioEl.current) return;
    this.audioEl.current.pause();
    this.audioEl.current.currentTime = 0;
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
              <audio id="track" crossOrigin="anonymous" src={track.preview_url} ref={this.audioEl}>
                Your browser does not support the <code>audio</code> element.
              </audio>
              <AudioSpectrum
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
              />
            </React.Fragment>
          ) : null}
          {!isPlaying ? <Avatar className={classes.avatar}>{Math.round(countdown)}</Avatar> : null}
        </Paper>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Player);

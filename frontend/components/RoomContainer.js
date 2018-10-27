import React, { Component } from 'react';
import { withRouter } from 'next/router';
import io from 'socket.io-client';
import Room from './Room';

class RoomContainer extends Component {
  state = {
    currentUser: null,
    users: [],
    playedTracks: [],
    currentTrack: null,
    isPlaying: false,
    timeLeft: 15000,
    countdown: 5
  };

  componentDidMount = () => {
    window.scrollTo(0, 0);
    const { category } = this.props.router.query;
    this.socket = io(`http://localhost:80/${category}`);
    this.socket.on('login', this.onLogin);
    this.socket.on('load track', this.onLoadTrack);
    this.socket.on('play track', this.onPlayTrack);
    this.socket.on('update score', this.updateUsers);
    this.socket.on('user joined', this.updateUsers);
    this.socket.on('user left', this.updateUsers);
  };

  componentWillUnmount = _ => {
    clearInterval(this.songInterval);
    clearInterval(this.countdownId);
  };

  addUser = username => {
    this.socket.emit('add user', username);
  };

  updateUsers = users => this.setState({ users });

  onLogin = (user, roomInfo) => {
    console.log('login successful', { user });
    this.setState({ currentUser: user, ...roomInfo });

    if (roomInfo.isPlaying) {
      this.songCountdown();
    }
  };

  onLoadTrack = roomInfo => {
    // We start the countdown
    console.log('load track', { ...roomInfo });
    this.setState({ ...roomInfo, countdown: 5 });
    this.startCountdown();
  };

  onPlayTrack = roomInfo => {
    console.log('play track', { ...roomInfo });
    this.setState({ ...roomInfo });
    this.songCountdown();
  };

  onCorrectGuess = (username, guessType) => {
    this.socket.emit('correct guess', username, guessType);
  };

  songCountdown = _ => {
    clearInterval(this.songInterval);
    this.songInterval = setInterval(_ => {
      // If the song ended, stop the interval.
      if (this.state.timeLeft < 0) {
        clearInterval(this.songInterval);
      }

      this.setState(state => ({ ...state, timeLeft: state.timeLeft - 250 }));
    }, 250);
  };

  startCountdown = _ => {
    this.countdownId = setInterval(_ => {
      // When the countdown ends, stop the interval.
      if (this.state.countdown < 1) {
        clearInterval(this.countdownId);
        return;
      }

      this.setState(state => ({ ...state, countdown: state.countdown - 1 }));
    }, 1000);
  };

  render() {
    const {
      currentUser,
      users,
      playedTracks,
      currentTrack,
      isPlaying,
      timeLeft,
      countdown
    } = this.state;
    return (
      <Room
        category={this.props.router.query.category}
        addUser={this.addUser}
        onCorrectGuess={this.onCorrectGuess}
        currentUser={currentUser}
        users={users}
        playedTracks={playedTracks}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        timeLeft={timeLeft}
        countdown={countdown}
      />
    );
  }
}

export default withRouter(RoomContainer);

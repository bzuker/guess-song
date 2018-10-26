import React, { Component } from 'react';
import { withRouter } from 'next/router';
import io from 'socket.io-client';
import Room from './Room';

class RoomContainer extends Component {
  state = {
    currentUser: null,
    roomInfo: {
      users: [],
      playedTracks: [],
      currentTrack: null
    },
    isPlaying: false,
    timeLeft: 15000,
    countdown: 5
  };

  componentDidMount = () => {
    const { category } = this.props.router.query;
    this.socket = io(`http://localhost:80/${category}`);
    this.socket.on('login', this.onLogin);
    this.socket.on('load track', this.onLoadTrack);
    this.socket.on('play track', this.onPlayTrack);
  };

  componentWillUnmount = _ => {
    clearInterval(this.songInterval);
    clearInterval(this.countdownId);
  };

  addUser = username => {
    this.socket.emit('add user', username);
  };

  onLogin = (user, roomInfo) => {
    console.log('login successful', { user });
    this.setState({ currentUser: user, roomInfo });
  };

  onLoadTrack = roomInfo => {
    // We start the countdown
    console.log('load track', { roomInfo });
    this.setState({ roomInfo, isPlaying: false, countdown: 5 });
    this.startCountdown();
  };

  onPlayTrack = _ => {
    console.log('play track');
    this.setState({ isPlaying: true, timeLeft: 15000 });
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
    const { currentUser, roomInfo, isPlaying, timeLeft, countdown } = this.state;
    return (
      <Room
        category={this.props.router.query.category}
        addUser={this.addUser}
        currentUser={currentUser}
        users={roomInfo.users}
        playedTracks={roomInfo.playedTracks}
        currentTrack={roomInfo.currentTrack}
        isPlaying={isPlaying}
        timeLeft={timeLeft}
        countdown={countdown}
      />
    );
  }
}

export default withRouter(RoomContainer);

import React, { Component } from 'react';
import { withRouter } from 'next/router';
import io from 'socket.io-client';
import Room from './Room';

class RoomContainer extends Component {
  state = {
    currentUser: null,
    roomInfo: null
  };
  componentDidMount = () => {
    const { category } = this.props.router.query;
    this.socket = io(`http://localhost:80/${category}`);
    console.log(`Connected to room ${category}`);
    this.socket.on('login', this.onLogin);
  };

  addUser = username => {
    this.socket.emit('add user', username);
  };

  onLogin = (user, roomInfo) => {
    this.setState({ currentUser: user, roomInfo });
    console.log(roomInfo);
  };

  render() {
    const { currentUser, roomInfo } = this.state;
    return (
      <Room
        category={this.props.router.query.category}
        addUser={this.addUser}
        currentUser={currentUser}
        roomInfo={roomInfo}
      />
    );
  }
}

export default withRouter(RoomContainer);

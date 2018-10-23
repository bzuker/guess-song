import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class AskUsername extends Component {
  state = {
    username: ''
  };

  handleSubmit = evt => {
    evt.preventDefault();
    // TODO: validate some more stuff.
    const { username } = this.state;
    if (!username) {
      return;
    }

    this.props.onSubmit(username);
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { open } = this.props;
    return (
      <Dialog open={open} aria-labelledby="form-dialog-title" style={{ alignItems: 'flex-start' }}>
        <DialogTitle id="form-dialog-title">Elegí un nombre de usuario</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Con tu usuario vas a poder saber cuántos puntos tenés.
          </DialogContentText>
          <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Usuario"
              type="text"
              fullWidth
              onChange={this.handleChange('username')}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleSubmit} color="primary">
            Jugar!
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AskUsername;

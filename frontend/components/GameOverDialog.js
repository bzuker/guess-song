import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';

const Transition = props => <Slide direction="up" {...props} />;
const getWinners = users =>
  users
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

const GameOverDialog = props => {
  const winners = getWinners(props.users);
  return (
    <Dialog open={props.open} TransitionComponent={Transition} style={{ alignItems: 'flex-start' }}>
      <DialogTitle>Ganadores:</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {winners.length > 0
            ? winners.map((x, i) => (
                <div key={i}>
                  {i + 1}. {x.name}
                </div>
              ))
            : 'No hubo ganadores.'}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default GameOverDialog;

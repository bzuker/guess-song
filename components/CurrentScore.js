import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const CurrentScore = ({ title, score, timeLeft, playedTracks }) => (
  <Paper>
    <LinearProgress value={(timeLeft * 100) / 150} variant="determinate" />
    <List subheader={<ListSubheader>{title}</ListSubheader>}>
      <ListItem>
        <ListItemText primary="Canción" />
        <Typography variant="body1" color="textSecondary">
          {`${playedTracks + 1}/10`}
        </Typography>
      </ListItem>
      <ListItem>
        <ListItemText primary="Puntos" />
        <Typography variant="body1" color="textSecondary">
          2
        </Typography>
      </ListItem>
    </List>
  </Paper>
);

export default CurrentScore;

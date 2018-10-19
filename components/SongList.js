import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const SongList = ({ songs = [], title }) => (
  <Paper>
    <List subheader={<ListSubheader>{title}</ListSubheader>}>
      {songs.map(s => (
        <ListItem key={s.id} button dense>
          <Avatar src={s.album.images[0].url} />
          <ListItemText primary={s.name} secondary={s.artists.map(a => a.name).join(', ')} />
        </ListItem>
      ))}
    </List>
  </Paper>
);

export default SongList;

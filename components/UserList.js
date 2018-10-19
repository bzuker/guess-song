import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PersonIcon from '@material-ui/icons/Person';

const UserList = ({ users = [], title, ...rest }) => (
  <Paper {...rest}>
    <List subheader={<ListSubheader>{title}</ListSubheader>}>
      {users.map((x, i) => (
        <ListItem key={i} dense>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={x.name} />
        </ListItem>
      ))}
    </List>
  </Paper>
);

export default UserList;

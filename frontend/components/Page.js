import Header from './Header';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  page: {
    overflow: 'hidden'
  },
  gridContainer: {
    width: 'auto',
    minHeight: '100vh',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1300 + theme.spacing.unit * 3 * 2)]: {
      width: 1300,
      marginTop: theme.spacing.unit * 10,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    [theme.breakpoints.down(1300 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 8
    }
  }
});

const Page = ({ classes, children }) => (
  <div className={classes.page}>
    <Header />
    <Grid
      className={classes.gridContainer}
      container
      spacing={16}
      justify="center"
    >
      {children}
    </Grid>
  </div>
);

export default withStyles(styles)(Page);

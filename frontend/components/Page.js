import Header from './Header';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  page: {
    overflow: 'hidden'
  },
  gridContainer: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1300 + theme.spacing.unit * 3 * 2)]: {
      width: 1300,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    marginTop: '20px',
    minHeight: '100vh'
  }
});

const Page = ({ classes, children }) => (
  <div className={classes.page}>
    <Header />
    <Grid className={classes.gridContainer} container spacing={16} justify="center">
      {children}
    </Grid>
  </div>
);

export default withStyles(styles)(Page);

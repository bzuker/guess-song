import Header from './Header';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  page: {
    overflow: 'hidden'
  },
  gridContainer: {
    marginTop: '20px'
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

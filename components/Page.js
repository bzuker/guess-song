import Header from './Header';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  gridContainer: {
    marginTop: '20px'
  }
});

const Page = props => (
  <div>
    <Header />
    <Grid className={props.classes.gridContainer} container spacing={16} justify="center">
      {props.children}
    </Grid>
  </div>
);

export default withStyles(styles)(Page);

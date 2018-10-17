import Grid from '@material-ui/core/Grid';
import CategoryPicker from '../components/CategoryPicker';

const Index = props => (
  <React.Fragment>
    <Grid item xs={10}>
      <CategoryPicker />
    </Grid>
  </React.Fragment>
);

export default Index;

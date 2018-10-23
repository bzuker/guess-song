import Grid from '@material-ui/core/Grid';
import CategoryPicker from '../components/CategoryPicker';
import Typography from '@material-ui/core/Typography';

const Index = props => (
  <React.Fragment>
    <Grid item xs={10}>
      <Typography variant="h3" gutterBottom>
        Elegí una categoría
      </Typography>
      <CategoryPicker />
    </Grid>
  </React.Fragment>
);

export default Index;

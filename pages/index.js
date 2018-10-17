import Grid from '@material-ui/core/Grid';

const Index = props => (
  <React.Fragment>
    <Grid item xs={6}>
      <p>El flujo va a ser:</p>
      <p>Elegir cateogría</p>
      <p>De ahí vamos a tomar una playlist al azar</p>
      <p>De esa playlist, elegimos temas al azar</p>
      <p>
        Lo ponemos y les damos a completar <b>Nombre del artista</b> y <b>Canción</b>
      </p>
    </Grid>
  </React.Fragment>
);

export default Index;

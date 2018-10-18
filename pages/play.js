import { withRouter } from 'next/router';
import Typography from '@material-ui/core/Typography';
import Player from '../components/Player';
import Autocomplete from '../components/Autocomplete';
import s from '../src/spotifyApi';

const Play = props => (
  <div>
    <Player category={props.router.query.category} />
    <Autocomplete
      fetchSuggestions={inputValue => s.searchTracks(inputValue).then(x => x.tracks.items)}
    />
  </div>
);

export default withRouter(Play);

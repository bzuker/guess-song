import { withRouter } from 'next/router';
import Room from '../components/Room';

const Play = props => <Room category={props.router.query.category} />;

export default withRouter(Play);

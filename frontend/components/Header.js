import Router from 'next/router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fade from '@material-ui/core/Fade';

class Header extends React.Component {
  state = {
    isLoading: false
  };

  componentDidMount = () => {
    Router.onRouteChangeStart = _ => {
      this.setState({ isLoading: true });
    };
    Router.onRouteChangeComplete = _ => {
      this.setState({ isLoading: false });
    };

    Router.onRouteChangeError = _ => {};
  };

  render() {
    const { isLoading } = this.state;
    return (
      <AppBar position="fixed">
        <Fade in={isLoading}>
          <LinearProgress variant="indeterminate" color="secondary" />
        </Fade>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Adiviná
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;

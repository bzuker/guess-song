import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Router from 'next/router';

const categories = [
  {
    icons: [
      {
        height: 274,
        url:
          'https://t.scdn.co/media/derived/rock_9ce79e0a4ef901bbd10494f5b855d3cc_0_0_274_274.jpg',
        width: 274
      }
    ],
    id: 'rock',
    name: 'Rock'
  },
  {
    icons: [
      {
        height: 274,
        url: 'https://pl.scdn.co/images/pl/default/2c11e8fe28d68c2e43948bfe94673b33d2d4a070',
        width: 274
      }
    ],
    id: 'rock_argentino',
    name: 'Rock Argentino'
  },
  // {
  //   icons: [
  //     {
  //       height: 274,
  //       url:
  //         'https://pl.scdn.co/images/pl/default/dadacb6a3ffa8390900f797c3d4d411cc30cd917',
  //       width: 274
  //     }
  //   ],
  //   id: 'top_argentino',
  //   name: 'Top Actual Argentina'
  // },
  // {
  //   icons: [
  //     {
  //       height: 274,
  //       url:
  //         'https://pl.scdn.co/images/pl/default/6eac0993234d1398288104aaf0b5b8005fb2f54a',
  //       width: 274
  //     }
  //   ],
  //   id: 'top_global',
  //   name: 'Top Actual Global'
  // },
  {
    icons: [
      {
        height: 274,
        url:
          'https://t.scdn.co/media/derived/pop-274x274_447148649685019f5e2a03a39e78ba52_0_0_274_274.jpg',
        width: 274
      }
    ],
    id: 'pop',
    name: 'Pop'
  }
  // {
  //   icons: [
  //     {
  //       height: 274,
  //       url:
  //         'https://t.scdn.co/media/derived/r-b-274x274_fd56efa72f4f63764b011b68121581d8_0_0_274_274.jpg',
  //       width: 274
  //     }
  //   ],
  //   id: 'mix',
  //   name: 'Mix'
  // }
];

const styles = theme => ({
  gridList: {
    overflow: 'hidden'
  },
  gridItem: {
    transform: 'scale(0.9)',
    transition: 'transform 0.4s cubic-bezier(0,0,0.3,1)',
    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1)'
    }
  }
});

class CategoryPicker extends React.Component {
  state = {
    window: {}
  };
  componentDidMount = () => {
    this.setState({ window });
    window.addEventListener('resize', _ => this.setState({ window }));
  };

  render() {
    const { classes } = this.props;
    console.log(this.window ? this.window.innerWidth : '');
    return (
      <div>
        <GridList
          className={classes.gridList}
          cellHeight={274}
          cols={this.state.window.innerWidth > 800 ? 3 : 1}>
          {categories.map(category => (
            <GridListTile
              className={classes.gridItem}
              key={category.id}
              onClick={_ => Router.push(`/play?category=${category.id}`)}>
              <img src={category.icons[0].url} alt={category.name} />
              <GridListTileBar title={category.name} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}
export default withStyles(styles)(CategoryPicker);

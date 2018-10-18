import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Router from 'next/router';

const categories = [
  {
    href: 'https://api.spotify.com/v1/browse/categories/toplists',
    icons: [
      {
        height: 275,
        url:
          'https://t.scdn.co/media/derived/toplists_11160599e6a04ac5d6f2757f5511778f_0_0_275_275.jpg',
        width: 275
      }
    ],
    id: 'toplists',
    name: 'Top Lists'
  },
  {
    href: 'https://api.spotify.com/v1/browse/categories/pop',
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
  },
  {
    href: 'https://api.spotify.com/v1/browse/categories/mood',
    icons: [
      {
        height: 274,
        url:
          'https://t.scdn.co/media/original/mood-274x274_976986a31ac8c49794cbdc7246fd5ad7_274x274.jpg',
        width: 274
      }
    ],
    id: 'mood',
    name: 'Mood'
  },
  {
    href: 'https://api.spotify.com/v1/browse/categories/party',
    icons: [
      {
        height: 274,
        url: 'https://t.scdn.co/media/links/partyicon_274x274.jpg',
        width: 274
      }
    ],
    id: 'party',
    name: 'Party'
  },
  {
    href: 'https://api.spotify.com/v1/browse/categories/hiphop',
    icons: [
      {
        height: 274,
        url:
          'https://t.scdn.co/media/original/hip-274_0a661854d61e29eace5fe63f73495e68_274x274.jpg',
        width: 274
      }
    ],
    id: 'hiphop',
    name: 'Hip-Hop'
  },
  {
    href: 'https://api.spotify.com/v1/browse/categories/chill',
    icons: [
      {
        height: 274,
        url:
          'https://t.scdn.co/media/derived/chill-274x274_4c46374f007813dd10b37e8d8fd35b4b_0_0_274_274.jpg',
        width: 274
      }
    ],
    id: 'chill',
    name: 'Chill'
  },
  {
    href: 'https://api.spotify.com/v1/browse/categories/decades',
    icons: [
      {
        height: 274,
        url:
          'https://t.scdn.co/media/derived/decades_9ad8e458242b2ac8b184e79ef336c455_0_0_274_274.jpg',
        width: 274
      }
    ],
    id: 'decades',
    name: 'Decades'
  },
  {
    href: 'https://api.spotify.com/v1/browse/categories/indie_alt',
    icons: [
      {
        height: null,
        url: 'https://t.scdn.co/images/fe06caf056474bc58862591cd60b57fc.jpeg',
        width: null
      }
    ],
    id: 'indie_alt',
    name: 'Indie'
  },
  {
    href: 'https://api.spotify.com/v1/browse/categories/edm_dance',
    icons: [
      {
        height: 274,
        url:
          'https://t.scdn.co/media/derived/edm-274x274_0ef612604200a9c14995432994455a6d_0_0_274_274.jpg',
        width: 274
      }
    ],
    id: 'edm_dance',
    name: 'Electronic/Dance'
  },
  {
    href: 'https://api.spotify.com/v1/browse/categories/sleep',
    icons: [
      {
        height: 274,
        url:
          'https://t.scdn.co/media/derived/sleep-274x274_0d4f836af8fab7bf31526968073e671c_0_0_274_274.jpg',
        width: 274
      }
    ],
    id: 'sleep',
    name: 'Sleep'
  },
  {
    href: 'https://api.spotify.com/v1/browse/categories/focus',
    icons: [
      {
        height: 274,
        url:
          'https://t.scdn.co/media/original/genre-images-square-274x274_5e50d72b846a198fcd2ca9b3aef5f0c8_274x274.jpg',
        width: 274
      }
    ],
    id: 'focus',
    name: 'Focus'
  },
  {
    href: 'https://api.spotify.com/v1/browse/categories/holidays',
    icons: [
      {
        height: null,
        url: 'https://t.scdn.co/images/c7f7fca5b5aa47e5941b701b1c7a66c8.jpeg',
        width: null
      }
    ],
    id: 'holidays',
    name: 'Happy Holidays'
  },
  {
    href: 'https://api.spotify.com/v1/browse/categories/country',
    icons: [
      {
        height: null,
        url: 'https://t.scdn.co/images/a2e0ebe2ebed4566ba1d8236b869241f.jpeg',
        width: null
      }
    ],
    id: 'country',
    name: 'Country'
  },
  {
    href: 'https://api.spotify.com/v1/browse/categories/rnb',
    icons: [
      {
        height: 274,
        url:
          'https://t.scdn.co/media/derived/r-b-274x274_fd56efa72f4f63764b011b68121581d8_0_0_274_274.jpg',
        width: 274
      }
    ],
    id: 'rnb',
    name: 'R&B'
  },
  {
    href: 'https://api.spotify.com/v1/browse/categories/workout',
    icons: [
      {
        height: null,
        url: 'https://t.scdn.co/media/links/workout-274x274.jpg',
        width: null
      }
    ],
    id: 'workout',
    name: 'Workout'
  },
  {
    href: 'https://api.spotify.com/v1/browse/categories/rock',
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
    href: 'https://api.spotify.com/v1/browse/categories/roots',
    icons: [
      {
        height: null,
        url: 'https://t.scdn.co/images/7fe0f2c9c91f45a3b6bae49d298201a4.jpeg',
        width: null
      }
    ],
    id: 'roots',
    name: 'Folk & Acoustic'
  },
  {
    href: 'https://api.spotify.com/v1/browse/categories/kpop',
    icons: [
      {
        height: null,
        url: 'https://t.scdn.co/images/69c728f3bd9643a5ab0f4ef5a79919f1.jpeg',
        width: null
      }
    ],
    id: 'kpop',
    name: 'K-Pop'
  },
  {
    href: 'https://api.spotify.com/v1/browse/categories/kids',
    icons: [
      {
        height: 275,
        url:
          'https://t.scdn.co/media/derived/kids_fec69f3f6e0a3df4ff330213ff2fcbcc_0_0_275_275.jpg',
        width: 275
      }
    ],
    id: 'kids',
    name: 'Kids'
  },
  {
    href: 'https://api.spotify.com/v1/browse/categories/dinner',
    icons: [
      {
        height: 274,
        url: 'https://t.scdn.co/media/original/dinner_1b6506abba0ba52c54e6d695c8571078_274x274.jpg',
        width: 274
      }
    ],
    id: 'dinner',
    name: 'Dinner'
  }
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

const CategoryPicker = props => (
  <div>
    <GridList className={props.classes.gridList} cellHeight={274} cols={4}>
      {categories.map(category => (
        <GridListTile
          className={props.classes.gridItem}
          key={category.id}
          onClick={_ => Router.push(`/play?category=${category.id}`)}
        >
          <img src={category.icons[0].url} alt={category.name} />
          <GridListTileBar title={category.name} />
        </GridListTile>
      ))}
    </GridList>
  </div>
);

export default withStyles(styles)(CategoryPicker);

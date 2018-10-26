const axios = require('axios');
const Spotify = require('spotify-web-api-node');

let s = new Spotify({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI
});

const getToken = async _ => {
  try {
    console.log('Getting credentials...');
    const data = await s.clientCredentialsGrant();
    s.setAccessToken(data.body.access_token);
    console.log('Got them.');
  } catch (error) {
    console.log(error);
  }
};

s.init = async _ => {
  await getToken();

  setInterval(getToken, 60 * 60 * 1000 - 60000); // 1h in ms - 1 min.
};

s.init();

module.exports = s;

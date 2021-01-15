const withImages = require('next-images');

module.exports = withImages({
  esModule: true,
});

module.exports = {
  env: {
    REACT_APP_API_URL: 'https://lifeasier-back-end.herokuapp.com',
  },
};

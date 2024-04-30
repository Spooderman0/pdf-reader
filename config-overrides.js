const path = require('path');
const { override, addWebpackAlias } = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    '@Images': path.resolve(__dirname, 'src/Images/') // Cambiado de '@images' a '@Images'
  })
);

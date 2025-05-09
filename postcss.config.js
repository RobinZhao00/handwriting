module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009',
      }, stage: 3, features: {
        'nesting-rules': true,
      },
    }),
    require('postcss-px-to-viewport')({
      viewportWidth: 375,
      viewportHeight: 667,
      unitPrecision: 7,
      viewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
    })],
};

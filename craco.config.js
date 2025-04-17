
module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      if (env === 'production') {
        // 设置 publicPath 为生产环境的路径
        webpackConfig.output.publicPath = 'https://latteai.com/handwriting/';
      }
      return webpackConfig;
    },
  },
  style: {
    postcss: {
      mode: 'file',
    },
  },
};

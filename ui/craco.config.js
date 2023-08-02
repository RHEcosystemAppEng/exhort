module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.output = {
        ...webpackConfig.output,
        filename: "static/js/[name].js",
      };
      webpackConfig.optimization = {
        ...webpackConfig.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendor'
            },
          },
        },
      };

      webpackConfig.module.rules[1].oneOf.unshift({
        test: /\.(png|jpg|jpeg|woff|woff2|eot|ttf|svg)$/,
        type: "asset/inline",
      });

      return webpackConfig;
    },
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          webpackConfig.plugins[5].options.filename = "static/css/[name].css";
          return webpackConfig;
        },
      },
      options: {},
    },
  ],
};

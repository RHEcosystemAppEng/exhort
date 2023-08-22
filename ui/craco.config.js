module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Modify the Webpack configuration here
      if (webpackConfig.plugins) {
        // Find the CSS Loader plugin in the plugins array
        const cssLoaderPlugin = webpackConfig.plugins.find(
            (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin'
        );

        if (cssLoaderPlugin) {
          // Disable warnings from MiniCssExtractPlugin
          cssLoaderPlugin.options.ignoreOrder = true;
        }
      }
      webpackConfig.output = {
        ...webpackConfig.output,
        filename: "static/js/[name].js",
      };
      webpackConfig.optimization = {
        ...webpackConfig.optimization,
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendor",
            },
          },
        },
      };

      // inline all assets into the JS bundle
      webpackConfig.module.rules[0].oneOf.unshift({
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

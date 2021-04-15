const webpack = require("webpack");
const Dotenv = require('dotenv-webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      new Dotenv(),
      new webpack.ProvidePlugin({
        $: "jquery",
        jquery: "jquery",
        "window.jQuery": "jquery",
        jQuery: "jquery"
      })
    ],
    devServer: {
      host: 'localhost',
      hot: true,
      port: 5001,
      proxy: {
        "/api": {
          target: "http://localhost:5000",
          secure: false,
          ws: false,
        }
      },
    }
  }
};

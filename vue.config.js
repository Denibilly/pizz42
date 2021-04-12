const webpack = require("webpack");
const Dotenv = require('dotenv-webpack');

module.exports = {
  devServer: {
    port: 3000
  },
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
      proxy: {
        "/api": {
          target: "http://localhost:3001"
        }
      }
    }
  }
};

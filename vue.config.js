const webpack = require("webpack");
const Dotenv = require('dotenv-webpack');

module.exports = {
  devServer: {
    port: 5001
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
          target: "http://localhost:5000"
        }
      },
    }
  }
};

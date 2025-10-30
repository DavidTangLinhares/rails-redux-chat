const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development", // or "production"
  devtool: "source-map",
  entry: {
    application: "./app/javascript/application.js",
    chat: "./app/javascript/chat.js"
  },
  output: {
    filename: "[name].js",
    sourceMapFilename: "[file].map",
    chunkFormat: "module",
    path: path.resolve(__dirname, "app/assets/builds")
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,        // matches .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"] // allows importing without extensions
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ]
};

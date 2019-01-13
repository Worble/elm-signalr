const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",

  module: {
    rules: [
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: ["elm-loader"]
      },
      {
        test: /\.(css|sass|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },

  devServer: {
    contentBase: "dist",
    watchContentBase: true,
    watchOptions: {
      ignored: /node_modules/
    }
  }
});

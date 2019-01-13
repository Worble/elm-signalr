const path = require("path");

module.exports = {
  entry: {
    app: ["./src/index.ts"]
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"],
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    extensions: [".js", ".ts", ".elm", ".css", ".scss"]
  },

  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist")
  },

  resolveLoader: {
    alias: {
      "elm-loader": path.join(__dirname, "loaders", "elmLoader.js")
    }
  }
};

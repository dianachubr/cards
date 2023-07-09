const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const isProduction = process.env.MODE_ENV === "production";

module.exports = {
  entry: "./js/index.js",
  mode: isProduction ? "production" : "development",
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "static",
          to: "static",
          //noErrorOnMissing: true,
         // globOptions: {
           // ignore: [".DS_Store", "**/index.html"],
         // },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./game.html",
    }),
  ],
};

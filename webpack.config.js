const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const isProduction = process.env.MODE_ENV === "production";

module.exports = {
  entry: "./js/index.js",
  //mode: "development",
  mode: isProduction ? "production" : "development",
  module: {
    rules: [
      { test: /\.css$/, use: [MiniCssExtractPlugin, "css-loader"] },
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
  optimization: {
    minimizer: [
      '...',
      new CssMinimizerPlugin(),
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin(),
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
      filename: "game.html",
      template: "./game.html",
    }),
  ],
  devtool: isProduction ? "hidden-source-map" : "source-map",
};

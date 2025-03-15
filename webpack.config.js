const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  devtool: "source-map",
  target: "node",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "src/dist"), // Chemin corrigé
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "GE Empty Template",
      template: path.join(process.cwd(), "src/index.html"),
      filename: "index.html",
    }),
    //new CopyPlugin({
    //  patterns: [
    //    {
    //      from: "src/index.html",
    //      to: "index.html",
    //    },
    //    {
    //      from: "src/styles.css",
    //      to: "styles.css",
    //    },
    //  ],
    //}),
  ],
  devServer: {
    host: "0.0.0.0",
    port: "1234",
  },
};

const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin"); // 따로 인스톨 해야함 위에 꺼까지

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Text Editor",
      }),
      new InjectManifest({
        swSrc: "./src-sw.js", // service workier 소스파일경로
        swDest: "src-sw.js", // service Worker 출력파일이름
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Text Edit",
        short_name: "J.A.T.E",
        description: "My awesome Progressive Web App!",
        background_color: "#00000a",
        theme_color: "#0000ee", //can be null, use-credentials or anonymous
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          // We use babel-loader in order to use ES6.
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],

            },
          },
        },
      ],
    },
  };
};

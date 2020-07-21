//import { SourceMapDevToolPlugin } from 'webpack'
//import * as webpack from 'webpack';

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
//const HtmlWebPackPlugin = require('react-to-html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  target: 'node',
  entry: './static/app.jsx',//'./index.js',//
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  //devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx$/,

        exclude: /node_modules/,
        use: {
          loader: 'babel-loader?cacheDirectory=true',

         // loader: "babel-loader",
          /*query: {
            presets: ['es2015']
          },*/
          options: {
            presets: [
            /*  "@babel/preset-react",*/
              {
                plugins: ["@babel/plugin-proposal-class-properties"],
              },
            ],
          },
        },
      },
      /*{
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },*/
      /*{
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },*/
      /*{
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }*/
    ],
},
resolve: {
  extensions: [".js", ".jsx"],
},

  cache: true,
  devtool: "eval-source-map",

  plugins: [
    new CleanWebpackPlugin(),
  //new webpack.SourceMapDevToolPlugin({}),
    /*new HtmlWebPackPlugin({
      hash: true,
     filename: "./public/pages/spa.html",
     template: "./views/index.ejs",
      chunks: ['bundle']
   }),*/
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "static",
          to: "",
          globOptions: {
            ignore: [
              "**/*.jsx",
            ],
          }
        },

      ],
      options: {},
    }),
  ]


};



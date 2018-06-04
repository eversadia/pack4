const path = require( 'path' )
const HtmlWebPackPlugin = require( "html-webpack-plugin" );
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve( __dirname, '../../../build' ),
    filename: '[name].js?[hash]'
  },
  module: {
    rules: [ {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    }, {
      test: /\.html$/,
      use: [ {
        loader: "html-loader",
        options: {
          minimize: true
        }
      } ]
    }, {
      test: /\.css$/,
      use: [ MiniCssExtractPlugin.loader, "css-loader" ]
    } ]
  },
  plugins: [
    new HtmlWebPackPlugin( {

      template: "./src/template/index.html",
      filename: "./index.html"
    } ),
    new MiniCssExtractPlugin( {
      filename: "[name].css",
      chunkFilename: "[id].css"
    } )
  ]
};
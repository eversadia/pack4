const path = require( 'path' )
const HtmlWebPackPlugin = require( "html-webpack-plugin" )
const FaviconsWebpackPlugin = require( 'favicons-webpack-plugin' )
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" )
const UglifyJSPlugin = require( 'uglifyjs-webpack-plugin' )
const react = require( 'react' )
const config = {}

config.entry = {
  app: './src/index.js'
}

config.output = {
  path: path.resolve( __dirname, '../../../build' ),
  filename: '[name].js?[hash]'
}

config.module = {
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
  }, {
    test: /\.scss$/,
    use: [ MiniCssExtractPlugin.loader, "css-loader", "sass-loader" ]
  }, {
    test: /\.(png|jpg|gif)$/,
    use: [ {
      loader: 'file-loader',
      options: {
        name: '[path][name].[ext]'
      }
    } ]
  }, {
    test: /\.(otf|eot|svg|ttf|woff|woff2)(\?.+)?$/,
    use: [ {
      loader: 'file-loader',
      options: {
        limit: 8192
      }
    } ]
  } ]
}

config.plugins = [
  // new FaviconsWebpackPlugin( {
  //   logo: './src/assets/img/favicon/apple-touch-icon-152x152.png',
  //   prefix: './icons/',
  // } ),
  new HtmlWebPackPlugin( {
    template: "./src/template/index.html",
    filename: "./index.html",
    favicon: './src/assets/img/favicon/favicon.png',
  } ),
  new MiniCssExtractPlugin( {
    filename: "[name].css",
    chunkFilename: "[id].css"
  } )
]

config.mode = 'development'
config.target = 'web'

config.devServer = {
  open: false,
  compress: true,
  port: 9999
}

config.resolve = {
  modules: [ 'node_modules' ],
  alias: {
    src: path.resolve( __dirname, 'src/' ),
    utils: path.resolve( __dirname, 'src/utils/' )
  }
}

module.exports = config
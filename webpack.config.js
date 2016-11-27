
var path = require('path');
var webpack = require( 'webpack');
var HtmlWebpackPlugin =require ('html-webpack-plugin');

exports.default = {
  debug:true,
  devtool: 'source-map',
  noInfo: false,
  entry: [
    path.resolve(__dirname, 'src/index.js')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'app'),
    publicPath: '/',
    filename: 'index.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
    , new webpack.optimize.DedupePlugin(),
new HtmlWebpackPlugin({
  template: 'src/index.html',
  inject: true
})
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style','css']}
    ]
  }
}

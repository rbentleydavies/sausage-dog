import path from 'path';
import webpack from 'webpack';

export default {
  debug:true,
  devtool: 'source-map',
  noInfo: false,
  entry: [
    path.resolve(__dirname, 'buildfiles/sausage.js')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
    , new webpack.optimize.DedupePlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style','css']}
    ]
  },
    node: {
      net: 'empty',
      tls: 'empty',
      dns: 'empty',
      fs: 'empty'
    }
}

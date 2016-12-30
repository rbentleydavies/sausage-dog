import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  debug:true,
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  devtool: 'inline-source-map',
  noInfo: false,
  entry: [
    path.resolve(__dirname, 'src/index'),
    path.resolve(__dirname, 'src/boot.ts')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
  template: 'src/index.html',
  inject: true
})
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style','css']},
      {test: /\.ts$/, loader: 'ts-loader'}
    ]
  }

}

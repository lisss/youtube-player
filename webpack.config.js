var path = require('path')

module.exports = {
  entry: './src/index',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib/')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.css']
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: ['./node_modules/']
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      }
    ]
  },
  devServer: {
    contentBase: './lib',
    hot: true
  }
}

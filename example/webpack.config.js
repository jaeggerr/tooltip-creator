const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'script.ts'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js' ]
  },
  output: {
    filename: 'script.js',
    path: path.resolve(__dirname)
  }
}

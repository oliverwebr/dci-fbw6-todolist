const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: ['./src/index.js']		
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          { 
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.sass$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          },						
        ]
      },
      {
        test: /\.css$/,
        use: [
          { 
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      }
      
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin()
  ]
}

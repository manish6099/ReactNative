const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 1. Where the web app starts
  entry: path.resolve(__dirname, 'index.web.js'),

  // 2. Where the final "web-ready" code goes
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        // 3. This tells Webpack to use Babel to translate your JS and JSX (React) code
        test: /\.(js|jsx)$/,
        exclude: /node_modules\/(?!react-native-)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },

  resolve: {
    // 4. THE MAGIC: This tells the computer: 
    // "Every time the code says 'react-native', use 'react-native-web' instead."
    alias: {
      'react-native$': 'react-native-web',
    },
    // 5. Look for these file types in order
    extensions: ['.web.js', '.js', '.jsx'],
  },

  plugins: [
    // 6. This takes your index.html template and injects the code into it
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
    }),
  ],

  devServer: {
    port: 8080, // You can change this to 3000 if you prefer
    historyApiFallback: true,
  },
};
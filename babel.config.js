module.exports = {
  presets: [
    'module:@react-native/babel-preset', // Keep this for mobile
    '@babel/preset-react',               // Add this for Web/Webpack
    '@babel/preset-env'                  // Add this for Web/Webpack
  ],
};
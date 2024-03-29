const path = require('path');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');

const config = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules[/\\](?!react-dnd|dnd-core)/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.resolve(__dirname, 'babel.config.js'),
          },
        },
      },
      {
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.b64$/,
        use: 'raw-loader',
      },
    ],
  },
  devtool: 'source-map',
  resolve: {
    modules: ['src', 'node_modules'],
  },
};

const clientConfig = merge(config, {
  entry: {
    ErrorPage: './src/pages/ErrorPage.js',
    LandingPage: './src/pages/LandingPage.js',
    ContactedPage: './src/pages/ContactedPage.js',
    WaveFunctionCollapsePage: './src/pages/WaveFunctionCollapsePage.js',
    QuestingBeastPage: './src/pages/QuestingBeastPage.js',
    ManaMatrixPage: './src/pages/ManaMatrixPage.js',
    MindTwistPage: './src/pages/MindTwistPage.js',
    LimitedSpace: './src/pages/LimitedSpace.js',
  },
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].js.map',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
});

const serverConfig = merge(config, {
  target: 'node',
  entry: {
    'pages/ErrorPage': './src/pages/ErrorPage.js',
    'pages/LandingPage': './src/pages/LandingPage.js',
    'pages/ContactedPage': './src/pages/ContactedPage.js',
    'pages/WaveFunctionCollapsePage': './src/pages/WaveFunctionCollapsePage.js',
    'pages/ManaMatrixPage': './src/pages/ManaMatrixPage.js',
    'pages/QuestingBeastPage': './src/pages/QuestingBeastPage.js',
    'pages/MindTwistPage': './src/pages/MindTwistPage.js',
    'pages/LimitedSpace': './src/pages/LimitedSpace.js',
  },
  output: {
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
  },
  externals: [
    nodeExternals({
      whitelist: ['react-tag-input', 'react-dnd', 'dnd-core', 'react-dnd-html5-backend', 'react-dnd-touch-backend'],
    }),
  ],
});

module.exports = { clientConfig, serverConfig };

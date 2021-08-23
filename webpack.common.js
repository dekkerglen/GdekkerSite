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
    InfoPage: './src/pages/InfoPage.js',
    ContactPage: './src/pages/ContactPage.js',
    AboutPage: './src/pages/AboutPage.js',
    FeedPage: './src/pages/FeedPage.js',
    EpisodePage: './src/pages/EpisodePage.js',
    SeasonPage: './src/pages/SeasonPage.js',
    ContactedPage: './src/pages/ContactedPage.js',
    ArchivePage: './src/pages/ArchivePage.js',
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
    'pages/InfoPage': './src/pages/InfoPage.js',
    'pages/ContactPage': './src/pages/ContactPage.js',
    'pages/AboutPage': './src/pages/AboutPage.js',
    'pages/FeedPage': './src/pages/FeedPage.js',
    'pages/EpisodePage': './src/pages/EpisodePage.js',
    'pages/SeasonPage': './src/pages/SeasonPage.js',
    'pages/ArchivePage': './src/pages/ArchivePage.js',
    'pages/ContactedPage': './src/pages/ContactedPage.js',
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

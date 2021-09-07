const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  // enntry file
  entry: ['@babel/polyfill', './view/javascripts/main.js', './view/stylesheets/main.scss'],
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'javascripts/bundle.js',
  },
  plugins: [
    // 컴파일 + 번들링 CSS 파일이 저장될 경로와 이름 지정
    new MiniCssExtractPlugin({ filename: 'stylesheets/style.css' }),
    new HtmlWebpackPlugin({ template: './view/index.html' }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'view/javascripts')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]?[hash]',
              publicPath: './dist/',
              limit: 8192,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'source-map',
  mode: 'development',
};

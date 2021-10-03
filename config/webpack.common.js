const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const PrettierPlugin = require('prettier-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const paths = require('./paths')

module.exports = {
  // Where webpack looks to start building the bundle
  entry: {
    main: path.resolve(paths.src, './index.js'),
  },

  // Where webpack outputs the assets and bundles
  output: {
    path: path.resolve(paths.src, './dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  // Determines how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // Images: Copy image files to build folder
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      // Fonts and SVGs: Inline files
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },

    //   TODO: setup MiniCssExtractPlugin for production
    ],
  },

  // Customize the webpack build process
  plugins: [
    
    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      title: 'webpack template',
      favicon: paths.favicon + '/favicon.ico',
      template: paths.src + '/template.html', // template file
      filename: 'index.html', // output file
    }),

    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

        // Copies files from target to destination folder
        new CopyWebpackPlugin({
          patterns: [
            {
              from: paths.public,
              to: 'assets',
              globOptions: {
                ignore: ['*.DS_Store'],
              },
              noErrorOnMissing: true,
            },
          ],
        }),

    // ESLint configuration
    new ESLintPlugin({
      files: ['.', 'src', 'config'],
      formatter: 'table',
    }),

    // Prettier configuration
        new PrettierPlugin(),
  ],

  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': paths.src,
    },
  }
}
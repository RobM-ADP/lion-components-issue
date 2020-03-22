const path = require('path');
const fs = require('fs');
const entries = {};
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RenameWebpackPlugin = require('rename-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

const components = fs.readdirSync('./src');
components.filter((file) => file !== 'mixins' && file !== 'themes' && file !== 'themeable.ts').forEach((componentFile) => {
  const folderName = componentFile;
  let fileName = 'adpl-' + folderName + '.ts'
  entries['adpl-' + folderName] = `./src/${folderName}/${fileName}`;
});


console.log('Found files:');
console.log(JSON.stringify(entries, null, 4));

const LIB_PREFIX = 'adpl'
module.exports = {
  entry: {...entries, main: './main.ts'},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.ts$/, use: [
          'ts-loader'
        ]
      },
      
        {
          test: /\.html$/, exclude: /node_modules/,
          use: {
              loader: 'file-loader'
          }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'lion webcomponent library',
      prefix: LIB_PREFIX,
      filename: 'index.html',
      template: './index.ejs',
      inject: true
    }),
    
  ],
  optimization:{
    minimize: false, // <---- disables uglify.
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      }
    }
  }
};
/**
 * Created by zhaoyue on 16/2/29.
 */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractPlugin = require('extract-text-webpack-plugin');

var path = require('path')
var pkg = require('./package.json')

var nodeModulesPath = path.resolve(__dirname, 'node_modules');

var productionPath = pkg.productionPath || pkg.name;

var webpackConfigProduction = {
    entry: {
      index: './src/js/componentIndex.js',
    },

    output: {
      path: __dirname + '/dist/' + productionPath,
      filename: 'js/[name].bundle.js'
    },

  module: {
      loaders: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel'
          },
          {test : /\.mustache$/ , loader : "mustache?noShortcut"},
          {
            test: /\.(scss|css)/,
            loader: ExtractPlugin.extract('style', ['css!sass'], {
              //替换css文件中的图片路劲,但 url-loader优先级更高，与输出图片文件的位置无关
              //css中涉及到的图片output到本地目录的路径由url-loader的name或output决定
              publicPath: '../'
            })
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loader: 'url?limit=1000&name=./img/[name].[ext]'
          }
      ]
  },
  plugins: [
		new webpack.ProvidePlugin({
			mping: '@jmfe/jm-mping', 
			React: 'react',
      ReactDOM: 'react-dom',
      "$" : "zepto",
		}),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
     new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
    }), 
		new HtmlWebpackPlugin({
        filename: './index.html', //若为相对路径，则相对publicPath
        template: './src/index.html',  //若为相对路径，则相对config
        inject: 'body',
        /* hash: true, */
        title : "验证码",
        chunks: ['index']
		}),
    new ExtractPlugin('css/[name].bundle.[chunkhash].css')
  ],
  resolve: {
    modulesDirectories: ['node_modules', 'src'],
    extensions: ['', '.js' , '.jsx' , ".mustache" , ".css" , ".scss"],
    alias : {
        	"zepto" : __dirname + "/src/lib/zepto.js"
		}
    // alias: {
    //   'react': path.join(nodeModulesPath, '/react/dist/react.min'),
    //   'react-dom': path.join(nodeModulesPath, '/react-dom/dist/react-dom.min')
    // }
  }
}

module.exports = webpackConfigProduction;

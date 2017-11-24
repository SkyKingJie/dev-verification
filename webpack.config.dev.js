var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractPlugin = require('extract-text-webpack-plugin');
var copyWebpackPlugin = require("copy-webpack-plugin");
var path = require('path');

module.exports = {

	entry: {
		index: './src/js/componentIndex.js'
	},

	output: {
		path: path.join(__dirname, '/dist/js'),
		filename: '[name].bundle.js'
	},

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
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
				loader: 'url-loader?limit=1000&name=img/[name].[ext]'
			}
		]
	},
  devServer: {
        outputPath: path.join(__dirname, 'dist')
    },
	plugins: [
		new webpack.ProvidePlugin({
			React: 'react',
			ReactDOM: 'react-dom',
		}),
		new HtmlWebpackPlugin({
			filename: './index.html', //相对publicPath
			template: './src/index.html',  //相对config
			inject: 'body'
		}),
		new ExtractPlugin('css/[name].bundle.css'),
	],

	resolve: {
		modulesDirectories: ['node_modules', 'src'],
		extensions: ['', '.js', '.jsx' , ".scss"],
		alias: {
			"zepto": __dirname + "/src/lib/zepto.js"
		}
	},

	devtool: 'source-map'
}

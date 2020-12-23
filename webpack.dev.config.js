const { merge } = require('webpack-merge');

const path = require('path');

const common = require('./webpack.common.config.js');
const WebpackNotifierPlugin = require('webpack-notifier')

module.exports = merge(common, {
	mode: 'development',
    output: {
    	path: path.resolve(__dirname, './dist'),   // where to build
    	publicPath: '/dist/',                      // where to serve from
    	filename: '[name].js'                     // names of chunks - based on entry points
    },
    plugins: [
	    // make sure to include the plugin!
	    new WebpackNotifierPlugin(),
	],
	devServer: {
		host: 'localhost',//your ip address
	    port: 8080,
	    disableHostCheck: true,
	    publicPath: '/dist'
	}
})
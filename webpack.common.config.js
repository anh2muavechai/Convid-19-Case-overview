var path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack');

module.exports = {

    entry: {
    	app: './src/main.js',
  	},

    resolve: {
		alias: {
			Vue: 'vue/dist/vue.esm.browser.js',
			"@": path.resolve(__dirname, './src/'),
		}
	},
    module: {
	    rules: [
	    	{
				// test: /\.js$/,
				test: /\.js$|jsx/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
	    	{
	        	test: /\.vue$/,
	        	loader: 'vue-loader'
	      	},
		    {
		    	test: /\.s[ac]ss$/i,
		    	use: [
		    	'style-loader',
		    	{
		    		loader: 'css-loader',
		    		options: {
		    			sourceMap: true,
		    		},
		    	},
		    	{
		    		loader: 'sass-loader',
		    		options: {
		    			sourceMap: true,
		    		},
		    	},
		    	],
		    },
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			}
	    ]
	},

	devServer: {
		historyApiFallback: true,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
			"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
		}
	},

	plugins: [
	    // make sure to include the plugin!
	    new VueLoaderPlugin()
	]
}
var path = require('path');

module.exports = {
	module: {
        loaders: [  
            { test: /\.css$/, loader: "style!css" },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
				include: [
					path.resolve(__dirname, './data'),
					path.resolve(__dirname, './config.js'),
					path.resolve(__dirname, './server.js')
				],
                loader: "babel",
            }
        ]
    }
};


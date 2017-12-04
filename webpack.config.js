const path = require('path');
const webpack = require('webpack');


var PROD = (process.env.NODE_ENV == 'production') ? true : false;

module.exports = {
    entry: './src/boot.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'engine.min.js',
        library: 'Engine' // it assigns this module to the global (window) object
    },
    plugins: PROD ? [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    ] : [],
    module: {
        loaders: [{
            loader: "babel-loader",

            // Skip any files outside of your project's `src` directory
            include: [
                path.resolve(__dirname, "./src"),
            ],



            // Only run `.js` and `.jsx` files through Babel
            test: /\.jsx?$/,


            // Options to configure babel with
            query: {
                plugins: ['transform-runtime'],
                presets: ['es2015'],
            }
        }]
    },
    resolve: {
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules'),
        ]
    },
    node: {
        fs: 'empty',
    }
};
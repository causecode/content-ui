var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var isProduction = process.argv.indexOf('-p') != -1;
var path = require('path');

var plugins = [];

var entryPoints = [
    'react-hot-loader/patch',
    './app/devIndex.tsx'
];

if (isProduction) {
    // Adding Production environment specific features.

    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    );
} else {
    // Adding Development environment specific features.
    entryPoints.push(
        'webpack/hot/only-dev-server'  // Used to enable hot reloading in webpack.
    );

    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('development')
        }
    })
}

plugins.push(
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.ejs'
    }),
    new ExtractTextPlugin({
        filename: 'style.css',
        allChunks: true
    })
);

var config = {
    entry: entryPoints,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: isProduction ? 'bundle.[hash].min.js' : 'bundle.js',
        publicPath: '/'
    },
    devtool: isProduction ? false : 'source-map',
    devServer: {
		historyApiFallback: true
	},
    resolve: {
        modules: [
            path.resolve(__dirname, './app'),
            'node_modules'
        ],
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.css', '.json']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                enforce: "pre",
                loader: 'tslint-loader',
                exclude: [/node_modules/,/tests/]
            },
            {
                test: /\.tsx?$/,
                exclude: [/node_modules/,/tests/],
                use: [
                    'react-hot-loader/webpack',
                    'ts-loader'
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
                use: [
                    'url-loader?limit=10&mimetype=image/(jpg|jpeg|gif|png)&name=assets/images/[name].[ext]'
                ]
            }
        ]
    },
    plugins: plugins
};

module.exports = config;
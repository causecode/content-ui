var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var isProduction = process.argv.indexOf('--production') != -1;

if (isProduction) {
    // Adding Production environment specific features.
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({  // Used for minification of .js and .css files.
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    );
} else {
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('development')
        }
    })
}

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.css', '.json']
    },
    module: {
        preLoaders: [
            {test: /\.tsx?$/, loader: 'tslint', exclude: /node_modules/}
        ],
        loaders: [
            {test: /\.tsx?$/, exclude: /node_modules/, loaders: ['react-hot', 'ts-loader']},
            {test: /\.css$/, loader: 'style!css'},
            {test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'url-loader?limit=1024&name=fonts/[name].[ext]'},
            {test: /\.(jpg|jpeg|gif|png)$/, loader: 'url-loader?limit=10&mimetype=image/(jpg|jpeg|gif|png)&name=images/[name].[ext]'},
            {test: /\.json$/, loader: 'json-loader' }
        ],
    },
    externals: {
        fs: '{}'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.ejs'
        })
    ]
}
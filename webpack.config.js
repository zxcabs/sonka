/**
 * Created by user on 31.10.14.
 */

var
    p = require('path');

module.exports = function (opt) {
    var
        exports = {
            context: p.join(__dirname, 'static'),
            entry: {
                main: [p.join(__dirname, 'static/src/index.es6.js')]
            },
            output: {
                path: p.join(__dirname, 'static/build'),
                publicPath: '/static/build/',
                filename: '[name].js',
                chunkFilename: '[name].chunk.[chunkHash].js'
            },

            resolve: {
                root: p.join(__dirname, 'static'),
                resolveLoader: {
                    root: p.join(__dirname, 'node_modules')
                }
            },
            module: {
                loaders: [
                    { test: /\.es6\.js$/, loader: 'traceur?runtime' },
                    { test: /.less$/, loader: 'style-loader!css-loader!less-loader' }
                ]
            }
        };


    return exports;
};
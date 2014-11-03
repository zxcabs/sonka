/**
 * Created by user on 31.10.14.
 */

var
    p = require('path');

module.exports = function (grunt) {
    var
        webpackConfig = require('./webpack.config.js')();

    grunt.loadNpmTasks('grunt-webpack');

    grunt.initConfig({

        webpack: {
            options: webpackConfig,
            dev: {
                keepalive: true,
                failOnError: false,
                progress: false,
                devtool: 'source-map'
            }
        },
        'webpack-dev-server': {
            options: {
                webpack: webpackConfig,
                publicPath: webpackConfig.output.publicPath
            },
            dev: {
                keepAlive: true,
                port: 8888,
                webpack: {
                    entry: {
                        main: ['webpack-dev-server/client?http://localhost:8888'].concat(webpackConfig.entry.main)
                    },
                    devtool: 'source-map',
                    failOnError: false,
                    debug: true,
                    watch: true
                }
            }
        }

    });


    grunt.registerTask('server', ['webpack-dev-server:dev']);
    grunt.registerTask('dev', ['webpack:dev']);
};
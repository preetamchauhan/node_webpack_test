var path = require('path');
var webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');


const {
    NODE_ENV = 'development',
  } = process.env;


  const serverConfig = {
    entry: {
        index: "/src/index.ts",
    },
    externals: [ nodeExternals() ],
    mode: NODE_ENV,
    target: 'node',
    watch: NODE_ENV === 'development',
    plugins: [
        new WebpackShellPluginNext({
          onBuildEnd: ['npm run:dev']
        })
      ],
    output: {
        path: path.resolve('build/js/'),
        publicPath: '/public/assets/js/',
        filename: "[name].js",
        libraryTarget: 'umd',
    library: 'MyLib',
    umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.es6$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }, {
                test: /\.js$/, // include .js files
                enforce: "pre", // preload the jshint loader
                exclude: /node_modules/, // exclude any and all files in the node_modules folder
                use: [
                    {
                        loader: "jshint-loader",
                        // more options in the optional jshint object
                        options: { // ⬅ formally jshint property
                            camelcase: true,
                            emitErrors: false,
                            failOnHint: false
                        }
                    }
                ]
            }, {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.es6', '.ts', '.tsx'],
    }
  }

  const clientConfig = {
    entry: {
        renderCsv: "/ui/renderCsvData.ts"
    },
    output: {
        path: path.resolve('build/js/'),
        publicPath: '/public/assets/js/',
        filename: "[name].js",
        libraryTarget: 'umd',
    library: 'MyLib',
    umdNamedDefine: true
    },
    devServer: {
        contentBase: 'public',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
          }
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.es6$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }, {
                test: /\.js$/, // include .js files
                enforce: "pre", // preload the jshint loader
                exclude: /node_modules/, // exclude any and all files in the node_modules folder
                use: [
                    {
                        loader: "jshint-loader",
                        // more options in the optional jshint object
                        options: { // ⬅ formally jshint property
                            camelcase: true,
                            emitErrors: false,
                            failOnHint: false
                        }
                    }
                ]
            }, {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.es6', '.ts', '.tsx']
    }
}


module.exports = [serverConfig, clientConfig];

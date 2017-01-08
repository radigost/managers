var webpack = require('webpack');

module.exports = {
     entry: './src/app.ts',
     output: {
         path: '../managers/static/managers',
         filename: 'app.js'
     },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js','.coffee','.html','.jade','.pug']
    },
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin()
    // ],
     module: {
         loaders:
             [
                 { test: /\.coffee$/, loader: "coffee-loader" },
                 { test: /\.html$/, loader: "html" },
                 {test: /\.pug/, loader: "pug-loader"},
                 {test: /\.jade/, loader: "pug-loader"},
                 { test: /\.ts$/, loader: 'ts-loader' }
        ]
     }
 };
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require ('extract-text-webpack-plugin');


module.exports = {
     entry: {
         app:'./src/app.ts',
         vendor:'./src/vendor.ts'
     },
     output: {
        path: '../managers/static/managers',
        filename: '[name].js'
     },
    // devtool: 'source-map',
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.js','.coffee','.html','.jade','.pug'],
        modules:[
            path.join(__dirname,"src"),
            "node_modules"
        ]
    },

     module: {
         rules:
             [
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: "css-loader"
                    })
                },

                { test: /\.coffee$/, use: "coffee-loader" },
                {
                 test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                 use: {
                    loader:'url-loader',
                    options: { limit: 100000 }
                 }
                },
                { test: /\.html$/, use: "html" },
                { test: /\.pug/, use: "pug-loader"},
                { test: /\.jade/, use: "pug-loader"},
                { test: /\.ts$/, use: 'ts-loader' },

        ]
     },
     plugins: [
         new ExtractTextPlugin({ filename: "styles.css" }),
        // new webpack.optimize.UglifyJsPlugin()
    ]
 };
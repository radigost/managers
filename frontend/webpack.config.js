 module.exports = {
     entry: './src/app.coffee',
     output: {
         path: '../managers/static/managers',
         filename: 'app.js'
     },
     module: {
         loaders:
             [
                 {test: /\.js$/,exclude: /node_modules/,loader: 'babel-loader',query: {
                       presets: ['es2015']
                        }},
                 { test: /\.coffee$/, loader: "coffee-loader" },
                 { test: /\.html$/, loader: "html" },
                 {test: /\.jade/, loader: "pug-loader"},
        ]
     }
 };
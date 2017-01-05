 module.exports = {
     entry: './src/app.js',
     output: {
         path: '../managers/static/managers',
         filename: 'app.js'
     },
     module: {
         loaders:
             [

                 { test: /\.coffee$/, loader: "coffee-loader" },
                 { test: /\.html$/, loader: "html" },
                 {test: /\.jade/, loader: "pug-loader"},
        ]
     }
 };
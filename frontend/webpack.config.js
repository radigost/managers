 module.exports = {
     entry: './src/app.ts',
     output: {
         path: '../managers/static/managers',
         filename: 'app.js'
     },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js','.coffee','.html','.jade']
    },
     module: {
         loaders:
             [

                 { test: /\.coffee$/, loader: "coffee-loader" },
                 { test: /\.html$/, loader: "html" },
                 {test: /\.jade/, loader: "pug-loader"},
                 { test: /\.ts$/, loader: 'ts-loader' }
        ]
     }
 };
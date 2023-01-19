const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './client/src/index.jsx'),

    output: {
        path: path.join(__dirname, './client/dist'),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ],
            }
        ]
    },
    mode: 'development'
}
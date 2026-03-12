const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const GlobEntries = require('webpack-glob-entries');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    mode: 'production',
    entry: GlobEntries('./src/**/*-test.ts'),
    output: {
        path: path.join(__dirname, 'dist'),
        libraryTarget: 'commonjs',
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        fallback: {
            fs: false,
            tls: false,
            net: false,
            path: false,
            zlib: false,
            http: false,
            https: false,
            stream: false,
            crypto: false,
            os: false,
        },
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.json$/,
                type: 'json',
            },
        ],
    },
    target: 'web',
    externals: /^(k6|https?\:\/\/)(\/.*)?/,
    // Generate map files for compiled scripts
    devtool: 'source-map',
    stats: {
        colors: true,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.EnvironmentPlugin(['BASE_URL_TEST']),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'assets'),
                    noErrorOnMissing: true,
                },
            ],
        }),
    ],
    optimization: {
        // Don't minimize, as it's not used in the browser
        minimize: false,
    },
};

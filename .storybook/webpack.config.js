const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const {TsConfigPathsPlugin} = require('awesome-typescript-loader');

const tsconfigPath = path.resolve(__dirname, '../tsconfig.json');
const tslintPath = path.resolve(__dirname, '../tslint.json');
const srcPath = path.resolve(__dirname, '../src');
const rootPath = path.resolve(__dirname, '../');

module.exports = ({ config }) => {
    config.module.rules.push(
        {
          test: /\.(ts|tsx)$/,
          include: rootPath,
          loader: require.resolve('awesome-typescript-loader')
        },
    );

    config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.plugins.push(
        new TsConfigPathsPlugin({
            configFileName: tsconfigPath,
        })
    );

    config.plugins.push(
        new ForkTsCheckerWebpackPlugin({
            async: false,
            watch: srcPath,
            tslint: tslintPath,
            tsconfig: tsconfigPath,
        })
    );

    config.resolve.modules = [
        ...(config.resolve.modules || []),
        path.resolve('./'),
    ];

    config.resolve.extensions.push('.ts', '.tsx');

    return config;
};

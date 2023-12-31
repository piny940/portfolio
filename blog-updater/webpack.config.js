module.exports = {
  entry: {
    main: `${__dirname}/main.ts`,
  },
  output: {
    path: `${__dirname}/out`,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
}

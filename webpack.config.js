var webpack = require('webpack');
var path = require('path');
var envFile = require('node-env-file');
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

try {
  envFile(path.join(__dirname, 'config/' + process.env.NODE_ENV + '.env'));
} catch (e) {

}

module.exports = {
  entry: [
    'script!jquery/dist/jquery.min.js',
    './app/app.jsx'
  ],
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_KEY: JSON.stringify(process.env.API_KEY),
        AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
        DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
        STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET),
        GITHUB_ACCESS_TOKEN: JSON.stringify(process.env.GITHUB_ACCESS_TOKEN),
        MAPS_API_KEY: JSON.stringify(process.env.MAPS_API_KEY),
      }
    }),
    new SWPrecacheWebpackPlugin(
      {
        cacheId: 'App',
        filename: './public/service-worker.js',
        maximumFileSizeToCacheInBytes: 8388608,
        staticFileGlobs: [
          'public/**.{html, js, json, xml, ico}',
          'public/images/**.*',
          'public/icons/**.*',
          'public/bundle.js'
        ],
        stripPrefix: 'public/',
        verbose: true,
        navigateFallback: 'index.html',

        runtimeCaching: [{
          urlPattern: /^https:\/\/fonts\.googleapis\.com/,
          handler: 'cacheFirst' /*can be: networkFirst,cacheFirstfastest,cacheOnly,networkOnly*/
        }, {
          urlPattern: /^https:\/\/ipinfo\.io/,
          handler: 'networkFirst'
        }, {
          urlPattern: /firebaseio\.com/,
          handler: 'fastest'
        }, {
          urlPattern: /^https:\/\/loremflickr\.com/,
          handler: 'cacheFirst'
        }/*, {
          urlPattern: /\/articles\//,
          handler: 'fastest',
          options: {
              cache: {
                maxEntries: 10,
                name: 'articles-cache'
              }
          }
        }*/]
      })
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    root: __dirname,
    modulesDirectories: [
      'node_modules',
      './app/components',
    ],
    alias: {
      app: 'app',
      applicationStyles: 'app/styles/app.scss',
      actions: 'app/actions/actions.jsx',
      reducers: 'app/reducers/reducers.jsx',
      configureStore: 'app/store/configureStore.jsx'
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, './node_modules/materialize-css/sass')
    ]
  },
  devtool: process.env.NODE_ENV === 'production' ? undefined : 'cheap-module-eval-source-map'
};

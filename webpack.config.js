import path from "path"

import webpack from "webpack"
import ExtractTextPlugin from "extract-text-webpack-plugin"
import { phenomicLoader } from "phenomic"
import PhenomicLoaderFeedWebpackPlugin
  from "phenomic/lib/loader-feed-webpack-plugin"
import PhenomicLoaderSitemapWebpackPlugin
  from "phenomic/lib/loader-sitemap-webpack-plugin"
import FaviconsWebpackPlugin
  from "favicons-webpack-plugin"

import pkg from "./package.json"

export default (config = {}) => {

  // hot loading for postcss config
  // until this is officially supported
  // https://github.com/postcss/postcss-loader/issues/66
  const postcssPluginFile = require.resolve("./postcss.config.js")
  const postcssPlugins = (webpackInstance) => {
    webpackInstance.addDependency(postcssPluginFile)
    delete require.cache[postcssPluginFile]
    return require(postcssPluginFile)(config)
  }

  return {
    ...config.dev && {
      devtool: "#cheap-module-eval-source-map",
    },
    module: {
      noParse: /\.min\.js/,
      rules: [
        // *.md => consumed via phenomic special webpack loader
        // allow to generate collection and rss feed.
        {
          // phenomic requirement
          test: /\.(md|markdown)$/,
          loader: phenomicLoader,
          query: {
            context: path.join(__dirname, config.source),
            plugins: [
              ...require("phenomic/lib/loader-preset-default").default,
              require("phenomic/lib/loader-plugin-markdown-init-head.description-property-from-content").default,
            ]
            // see https://phenomic.io/docs/usage/plugins/
          },
        },

        // *.js => babel + eslint
        {
          test: /\.js$/,
          include: [
            path.resolve(__dirname, "scripts"),
            path.resolve(__dirname, "src"),
          ],
          loaders: [
            "babel-loader?cacheDirectory",
            "eslint-loader" + (config.dev ? "?emitWarning" : ""),
          ],
        },

        // ! \\
        // by default *.css files are considered as CSS Modules
        // And *.global.css are considered as global (normal) CSS

        // *.css => CSS Modules
        {
          test: /\.css$/,
          exclude: [
            /\.global\.css$/,
          ],
          include: [
            path.resolve(__dirname, "src"),
            /react-toolbox/,
          ],
          loader: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: "css-loader",
                query: {
                  modules: true,
                  localIdentName: (
                    config.production
                    ? "[hash:base64:5]"
                    : "[path][name]--[local]--[hash:base64:5]"
                  ),
                },
              },
              {
                loader: "postcss-loader",
                // query for postcss can't be used right now
                // https://github.com/postcss/postcss-loader/issues/99
                // meanwhile, see webpack.LoaderOptionsPlugin in plugins list
                // query: { plugins: postcssPlugins },
              },
            ],
          }),
        },
        // *.global.css => global (normal) css
        {
          test: /\.global\.css$/,
          include: path.resolve(__dirname, "src"),
          loader: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              "css-loader",
              {
                loader: "postcss-loader",
                // query for postcss can't be used right now
                // https://github.com/postcss/postcss-loader/issues/99
                // meanwhile, see webpack.LoaderOptionsPlugin in plugins list
                // query: { plugins: postcssPlugins },
              },
            ],
          }),
        },
        // ! \\
        // If you want global CSS only, just remove the 2 sections above
        // and use the following one
        // ! \\ If you want global CSS for node_modules only, just uncomment
        // this section and the `include` part
        /*
        {
          test: /\.css$/,
          // depending on your need, you might need to scope node_modules
          // for global CSS if you want to keep CSS Modules by default
          // for your own CSS. If so, uncomment the line below
          // include: path.resolve(__dirname, "node_modules"),
          loader: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              "css-loader",
              {
                loader: "postcss-loader",
                query: { "plugins": postcssPlugins },
              },
            ]
          }),
        },
        */
        {
          test: /\.css$/,
          include: [
            /typeface-roboto/,
          ],
          loader: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              "css-loader",
            ]
          })
        },
        {
          test: /\.font\.js$/,
          loader: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              "css-loader",
              "webfonts-loader?fileName=fonts/[fontname].[hash].[ext]",
            ]
          })
        },
        // ! \\ if you want to use Sass or LESS, you can add sass-loader or
        // less-loader after postcss-loader (or replacing it).
        // ! \\ You will also need to adjust the file extension
        // and to run the following command
        //
        // Sass: `npm install --save-dev node-sass sass-loader`
        // https://github.com/jtangelder/sass-loader
        //
        // LESS: npm install --save-dev less less-loader
        // https://github.com/webpack/less-loader

        // copy assets and return generated path in js
        {
          test: /\.woff(2)?$/,
          loader: "url-loader",
          include: [
            /Medcons/,
            /typeface-roboto/,
          ],
          query: {
            limit: 10000,
            mimetype: "application/font-woff",
            name: "fonts/[name].[hash].[ext]",
          }
        },
        {
          test: /\.ttf$/,
          loader: "url-loader",
          include: [
            /Medcons/,
            /typeface-roboto/,
          ],
          query: {
            limit: 10000,
            mimetype: "application/octet-stream",
            name: "fonts/[name].[hash].[ext]",
          }
        },
        {
          test: /\.svg$/,
          loader: "url-loader",
          include: [
            /Medcons/,
            /typeface-roboto/,
          ],
          query: {
            limit: 10000,
            mimetype: "image/svg+xml",
            name: "fonts/[name].[hash].[ext]",
          }
        },
        {
          test: /\.eot$/,
          loader: "file-loader",
          include: [
            /Medcons/,
            /typeface-roboto/,
          ],
          query: {
            name: "fonts/[name].[hash].[ext]",
          }
        },

        {
          test: /\.(html|ico|jpe?g|png|gif|eot|otf|webp|ttf|woff(2)?)$/,
          exclude: [
            /Medcons/,
            /typeface-roboto/,
          ],
          loader: "file-loader",
          query: {
            name: "[path][name].[hash].[ext]",
            context: path.join(__dirname, config.source),
          },
        },

        // svg as raw string to be inlined
        {
          test: /\.svg$/,
          include: [
            path.resolve(__dirname, "src/icons"),
          ],
          use: [
            {
              loader: "raw-loader",
            },
            {
              loader: "svgo-loader",
              options: {
                plugins: [
                  { removeTitle: true, removeDesc: true },
                  { convertColors: { shorthex: false } },
                  { convertPathData: false },
                ],
              },
            },
          ],
        },
      ],
    },

    plugins: [
      // You should be able to remove the block below when the following
      // issue has been correctly handled (and postcss-loader supports
      // "plugins" option directly in query, see postcss-loader usage above)
      // https://github.com/postcss/postcss-loader/issues/99
      new webpack.LoaderOptionsPlugin({
        test: /\.css$/,
        options: {
          postcss: postcssPlugins,
          // required to avoid issue css-loader?modules
          // this is normally the default value, but when we use
          // LoaderOptionsPlugin, we must specify it again, otherwise,
          // context is missing (and css modules names can be broken)!
          context: __dirname,
        },
      }),

      new PhenomicLoaderFeedWebpackPlugin({
        // here you define generic metadata for your feed
        feedsOptions: {
          title: pkg.name,
          site_url: pkg.homepage,
        },
        feeds: {
          // here we define one feed, but you can generate multiple, based
          // on different filters
          "feed.xml": {
            collectionOptions: {
              filter: { layout: "Post" },
              sort: "date",
              reverse: true,
              limit: 20,
            },
          },
        },
      }),

      new PhenomicLoaderSitemapWebpackPlugin({
        site_url: pkg.homepage,
      }),

      new ExtractTextPlugin({
        filename: "[name].[hash].css",
        disable: config.dev,
      }),

      ...config.dev && [
        new FaviconsWebpackPlugin({
          logo: path.join(__dirname, "favicon.png"),
          prefix: pkg.phenomic.assets + "/",
          persistentCache: false,
          inject: false,
          icons: {
            android: false,
            appleIcon: false,
            appleStartup: false,
            coast: false,
            favicons: true,
            firefox: false,
            opengraph: false,
            twitter: false,
            yandex: false,
            windows: false,
          },
        }),
      ],

      ...config.production && [
        new webpack.optimize.UglifyJsPlugin(
          { compress: { warnings: false } }
        ),
        new FaviconsWebpackPlugin({
          logo: path.join(__dirname, "favicon.png"),
          appName: pkg.name,
          appDescription: pkg.description,
          developerName: pkg.author,
          developerURL: pkg.homepage,
          prefix: pkg.phenomic.assets + "/",
          persistentCache: false,
          inject: false,
          background: "#000",
          display: "browser",
          orientation: "portrait",
          start_url: "",
          icons: {
            android: true,
            appleIcon: true,
            appleStartup: false,
            coast: false,
            favicons: true,
            firefox: true,
            opengraph: false,
            twitter: false,
            yandex: true,
            windows: true,
          },
        }),
      ],
    ],

    output: {
      path: path.join(__dirname, config.destination),
      publicPath: config.baseUrl.pathname,
      filename: "[name].[hash].js",
    },

    resolve: {
      alias: {
        "masonry": "masonry-layout",
        "isotope": "isotope-layout"
      },
      extensions: [ ".js", ".json" ]
    },
  }
}

import React, { PropTypes } from "react"
import Helmet from "react-helmet"

const DefaultHeadMeta = (props, { metadata: { pkg } }) => (
  <div hidden>
    <Helmet
      meta={ [
        {
          name: "generator", content: `${
          process.env.PHENOMIC_NAME } ${ process.env.PHENOMIC_VERSION }`,
        },
        { property: "og:site_name", content: pkg.name },
        { name: "twitter:site", content: `@${ pkg.twitter }` },
        ...props.meta ? props.meta : [],
      ] }
      script={ [
        { src: "https://cdn.polyfill.io/v2/polyfill.min.js" +
        "?features=es6&flags=gated" },
        ...props.scripts ? props.scripts : [],
      ] }
    />

    { /* meta viewport safari/chrome/edge */ }
    <Helmet
      meta={ [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
      ] }
      link={ [
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "assets/favicon-32x32.png?v=1",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "assets/favicon-16x16.png?v=1",
        },
        {
          rel: "shortcut icon",
          href: "assets/favicon.ico?v=1",
        },
      ] }
    />

    { process.env.NODE_ENV === "production" &&
      <Helmet
        link={ [
          {
            rel: "manifest",
            href: "assets/manifest.json?v=1",
          },
          {
            rel: "apple-touch-icon",
            sizes: "57x57",
            href: "assets/apple-icon-57x57.png?v=1",
          },
          {
            rel: "apple-touch-icon",
            sizes: "60x60",
            href: "assets/apple-icon-60x60.png?v=1",
          },
          {
            rel: "apple-touch-icon",
            sizes: "72x72",
            href: "assets/apple-icon-72x72.png?v=1",
          },
          {
            rel: "apple-touch-icon",
            sizes: "76x76",
            href: "assets/apple-icon-76x76.png?v=1",
          },
          {
            rel: "apple-touch-icon",
            sizes: "114x114",
            href: "assets/apple-icon-114x114.png?v=1",
          },
          {
            rel: "apple-touch-icon",
            sizes: "120x120",
            href: "assets/apple-icon-120x120.png?v=1",
          },
          {
            rel: "apple-touch-icon",
            sizes: "144x144",
            href: "assets/apple-icon-144x144.png?v=1",
          },
          {
            rel: "apple-touch-icon",
            sizes: "152x152",
            href: "assets/apple-icon-152x152.png?v=1",
          },
          {
            rel: "apple-touch-icon",
            sizes: "180x180",
            href: "assets/apple-icon-180x180.png?v=1",
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "192x192",
            href: "assets/android-chrome-192x192.png?v=1",
          },
        ] }
        meta={ [
          {
            name: "apple-mobile-web-app-capable",
            content: "yes",
          },
          {
            name: "apple-mobile-web-app-status-bar-style",
            content: "black-translucent",
          },
          {
            name: "apple-mobile-web-app-title",
            content: pkg.name,
          },
          {
            name: "mobile-web-app-capable",
            content: "yes",
          },
          {
            name: "theme-color",
            content: "#000",
          },
          {
            name: "application-name",
            content: pkg.name,
          },
          {
            name: "msapplication-TileColor",
            content: "#000",
          },
          {
            name: "msapplication-TileImage",
            content: "assets/mstile-144x144.png?v=1",
          },
          {
            name: "msapplication-config",
            content: "assets/browserconfig.xml?v=1",
          },
        ] }
      />
    }
    <style>{ "@-ms-viewport { width: device-width; }" }</style>
  </div>
)

DefaultHeadMeta.propTypes = {
  meta: React.PropTypes.arrayOf(React.PropTypes.object),
  scripts: React.PropTypes.arrayOf(React.PropTypes.object),
}

DefaultHeadMeta.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

export default DefaultHeadMeta

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { joinUri } from "phenomic"

const DefaultHeadMeta = (props, { metadata: { pkg } }) => {
  const phenomicAssetsUrl = joinUri(process.env.PHENOMIC_USER_URL, pkg.phenomic.assets)
  const faviconVersionString = "?v=1"
  return (
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
            href: `${ phenomicAssetsUrl }/favicon-32x32.png${ faviconVersionString }`,
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            href: `${ phenomicAssetsUrl }/favicon-16x16.png${ faviconVersionString }`,
          },
          {
            rel: "shortcut icon",
            href: `${ phenomicAssetsUrl }/favicon.ico${ faviconVersionString }`,
          },
        ] }
      />

      { process.env.NODE_ENV === "production" &&
        <Helmet
          link={ [
            {
              rel: "manifest",
              href: `${ phenomicAssetsUrl }/manifest.json${ faviconVersionString }`,
            },
            {
              rel: "yandex-tableau-widget",
              href: `${ phenomicAssetsUrl }/yandex-browser-manifest.json${ faviconVersionString }`,
            },
            {
              rel: "apple-touch-icon",
              sizes: "57x57",
              href: `${ phenomicAssetsUrl }/apple-touch-icon-57x57.png${ faviconVersionString }`,
            },
            {
              rel: "apple-touch-icon",
              sizes: "60x60",
              href: `${ phenomicAssetsUrl }/apple-touch-icon-60x60.png${ faviconVersionString }`,
            },
            {
              rel: "apple-touch-icon",
              sizes: "72x72",
              href: `${ phenomicAssetsUrl }/apple-touch-icon-72x72.png${ faviconVersionString }`,
            },
            {
              rel: "apple-touch-icon",
              sizes: "76x76",
              href: `${ phenomicAssetsUrl }/apple-touch-icon-76x76.png${ faviconVersionString }`,
            },
            {
              rel: "apple-touch-icon",
              sizes: "114x114",
              href: `${ phenomicAssetsUrl }/apple-touch-icon-114x114.png${ faviconVersionString }`,
            },
            {
              rel: "apple-touch-icon",
              sizes: "120x120",
              href: `${ phenomicAssetsUrl }/apple-touch-icon-120x120.png${ faviconVersionString }`,
            },
            {
              rel: "apple-touch-icon",
              sizes: "144x144",
              href: `${ phenomicAssetsUrl }/apple-touch-icon-144x144.png${ faviconVersionString }`,
            },
            {
              rel: "apple-touch-icon",
              sizes: "152x152",
              href: `${ phenomicAssetsUrl }/apple-touch-icon-152x152.png${ faviconVersionString }`,
            },
            {
              rel: "apple-touch-icon",
              sizes: "180x180",
              href: `${ phenomicAssetsUrl }/apple-touch-icon-180x180.png${ faviconVersionString }`,
            },
            {
              rel: "icon",
              type: "image/png",
              sizes: "192x192",
              href: `${ phenomicAssetsUrl }/android-chrome-192x192.png${ faviconVersionString }`,
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
              content: `${ phenomicAssetsUrl }/mstile-144x144.png${ faviconVersionString }`,
            },
            {
              name: "msapplication-config",
              content: `${ phenomicAssetsUrl }/browserconfig.xml${ faviconVersionString }`,
            },
          ] }
        />
      }
      <style>{ "@-ms-viewport { width: device-width; }" }</style>
    </div>
  )
}

DefaultHeadMeta.propTypes = {
  meta: PropTypes.arrayOf(PropTypes.object),
  scripts: PropTypes.arrayOf(PropTypes.object),
}

DefaultHeadMeta.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

export default DefaultHeadMeta

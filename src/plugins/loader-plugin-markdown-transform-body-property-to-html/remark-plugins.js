/* eslint-disable import/max-dependencies */

// https://github.com/wooorm/remark
import remark from "remark"
// https://github.com/wooorm/remark-slug
import slug from "remark-slug"
// https://github.com/ben-eb/remark-autolink-headings
import autoLinkHeadings from "remark-autolink-headings"
// https://github.com/wooorm/remark-toc
import toc from "remark-toc"
// https://github.com/medfreeman/remark-generic-extensions
import genericExtensions from "remark-generic-extensions"
// https://github.com/mapbox/remark-react
import reactRenderer from "remark-react"
// https://github.com/bebraw/remark-react-lowlight
import RemarkLowlight from "remark-react-lowlight"
// for code highlight
import merge from "deepmerge"
import sanitizeGhSchema from "hast-util-sanitize/lib/github.json"

import csshook from "css-modules-require-hook/preset"
import TooltipIcon from "../../components/TooltipIcon"

import languages from "./common-languages.js"

export default (body) =>
  remark()
    .use(slug)
    .use(autoLinkHeadings, {
      // @todo find how to make this options works with remark-react
      content: {
        type: "text",
        value: "#",
      },
      linkProperties: {
        className: "phenomic-HeadingAnchor",
      },
    })
    .use(toc)
    .use(genericExtensions, {
      debug: false,
      elements: {
        Icon: {
          attributeDefaultValues: {
            floating: true,
          },
          hast: {
            icon: "::argument::",
            tooltip: "::content::"
          }
        }
      }
    })
    .use(reactRenderer, {
      sanitize: merge(sanitizeGhSchema, {
        // remove user-content from github.json for remark-slug to work as expected
        clobberPrefix: "",
        tagNames: [
          "Icon",
        ],
        // allow code to have className
        attributes: {
          code: ["className"],
          a: ["className"],
          Icon: [
            "className",
            "tooltip",
            "icon",
            "floating",
          ],
        },
      }),
      remarkReactComponents: {
        code: RemarkLowlight(languages),
        Icon: (properties) => {
          return TooltipIcon(properties)
        }
      },
    })
    // render
    .processSync(body, {
      commonmark: true,
    })

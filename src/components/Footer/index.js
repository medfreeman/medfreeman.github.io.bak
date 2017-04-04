import React from "react"
import Svg from "react-svg-inline"

import reactSvg from "../icons/react.svg"

import styles from "./index.css"

const Footer = () => (
  <footer className={ styles.footer }>
    { /* If you like Phenomic, this is a way to share the love ;) */ }
    <p>
      <a
        href={ process.env.PHENOMIC_HOMEPAGE }
        className={ styles.externalReference }
      >
        { "Website generated with " }
        <span className={ styles.externalReferenceName }>
          {  `<${ process.env.PHENOMIC_NAME} />` }
        </span>
      </a>
      <span className={ styles.externalReference }>
        { " — " }
      </span>
      <a
        href="https://facebook.github.io/react/"
        className={ styles.externalReference }
      >
        { "Built with " }
        <span className={ styles.externalReferenceName }>
          <Svg
            className={ styles.reactSvg }
            svg={ reactSvg }
            width="16px"
            height="16px"
            cleanupExceptions={ [ "fill" ] }
          />
          { "React" }
        </span>
      </a>
    </p>
  </footer>
)

export default Footer

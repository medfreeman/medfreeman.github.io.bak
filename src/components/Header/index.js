import React from "react"
import PropTypes from "prop-types"
import { Link } from "phenomic"
import Svg from "react-svg-inline"

import logoSvg from "../../icons/medfreeman_3d_dark.svg"
import twitterSvg from "../../icons/iconmonstr-twitter-1.svg"
import gitHubSvg from "../../icons/iconmonstr-github-1.svg"

import styles from "./index.css"

const Header = (props, { metadata: { pkg } }) => (
  <header className={ styles.header }>
    <nav className={ styles.nav }>
      <div className={ styles.navPart1 }>
        <Svg
          className={ styles.logoSvg }
          svg={ logoSvg }
          width="50px"
          height="50px"
        />
        <Link
          className={ styles.link }
          to={ "/" }
        >
          { "Home" }
        </Link>
        <Link
          className={ styles.link }
          to={ "/portfolio/" }
        >
          { "Portfolio" }
        </Link>
        <Link
          className={ styles.link }
          to={ "/blog/" }
        >
          { "Blog" }
        </Link>
        <Link
          className={ styles.link }
          to={ "/about/" }
        >
          { "About Me" }
        </Link>
      </div>
      <div className={ styles.navPart2 }>
        {
          pkg.twitter &&
          <a
            href={ `https://twitter.com/${pkg.twitter}` }
            className={ styles.link }
          >
            <Svg svg={ twitterSvg } cleanup />
            { "Twitter" }
          </a>
        }
        {
          pkg.repository &&
          <a
            href={ pkg.repository }
            className={ styles.link }
          >
            <Svg svg={ gitHubSvg } cleanup />
            { "GitHub" }
          </a>
        }
      </div>
    </nav>
  </header>
)

Header.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

export default Header

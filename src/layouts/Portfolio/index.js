import React, { PropTypes } from "react"

import Gallery from "../../components/Gallery"
import Page from "../Page"

const Portfolio = (props) => {
  return (
    <Page { ...props }>
      <Gallery elements={ props.head.gallery ? props.head.gallery : [] } />
    </Page>
  )
}

Portfolio.propTypes = {
  head: PropTypes.shape({
    gallery: PropTypes.arrayOf(React.PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })).isRequired,
  }),
}

export default Portfolio

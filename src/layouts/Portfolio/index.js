import React, { PropTypes } from "react"

import Gallery from "../../components/Gallery"
import Page from "../Page"

const Portfolio = (props) => {
  const galleryElements = props.head.gallery ?
    props.head.gallery.map((element, index) => {
      return (
        <a
          key={ index }
          href={ element.url }
          target="_blank"
          rel="noreferrer noopener"
        >
          <img src={ element.image } />
        </a>
      )
    }) : []

  return (
    <Page { ...props }>
      <Gallery>
        { galleryElements }
      </Gallery>
    </Page>
  )
}

Portfolio.propTypes = {
  head: React.PropTypes.shape({
    gallery: PropTypes.array,
  }),
}

export default Portfolio

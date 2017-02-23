import React, { PropTypes } from "react"
import Masonry from "react-masonry-component"

import styles from "./index.css"

const masonryOptions = {
  transitionDuration: 0,
}

const Gallery = (props) => {
  return (
    <Masonry
      className={ styles.gallery }
      elementType={ "ul" }
      options={ masonryOptions }
      disableImagesLoaded={ false }
      updateOnEachImageLoad={ false }
    >
      {
        React.Children.map(props.children, (element) => {
          return (
            <li className={ styles.element }>
              { element }
            </li>
          )
        })
      }
    </Masonry>
  )
}

Gallery.propTypes = {
  children: PropTypes.node,
}

export default Gallery

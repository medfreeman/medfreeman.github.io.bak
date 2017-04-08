/* eslint-disable react/jsx-no-bind */

import React, { PropTypes } from "react"

import Isotope from "../Isotope"

import styles from "./index.css"

const Gallery = (props) => {
  return (
    <Isotope
      isoOptions={
        {
          itemSelector: `.${styles["gallery-item-container"]}`,
          layoutMode: 'masonry',
          masonry: {
              // Using a sizer element is necessary to prevent a vertical collapse between data loads
              // Ex. load all, then load metal, the metal will collapse into a vertical layout if this masonry: {}
              // section is commented out.
              columnWidth: `.${styles["gallery-item-sizer"]}`
          },
          //sortBy: 'name', // If you want to set the default sort, do that here.
          getSortData: {
          }
        }
      }
    >
      <div className={ styles["gallery-item-sizer"] } />
      {
        props.elements.map((element, index) => {
          return (
            <div key={ index } className={ styles["gallery-item-container"] }>
              <div className={ styles["gallery-item"] }>
                <a
                  href={ element.url }
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <img src={ element.image } />
                </a>
              </div>
            </div>
          )
        })
      }
    </Isotope>
  )
}

Gallery.propTypes = {
  elements: PropTypes.array,
}

export default Gallery

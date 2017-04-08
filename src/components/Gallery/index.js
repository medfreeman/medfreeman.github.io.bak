import path from "path"

import React, { PropTypes } from "react"
import cx from "classnames"

import Isotope from "../Isotope"

import styles from "./index.css"

const Gallery = (props) => {
  const sizeArray = [
    "sm",
    "high",
  ];

  return (
    <Isotope
      isoOptions={
        {
          itemSelector: `.${styles["gallery-item-container"]}`,
          layoutMode: 'packery',
          packery: {
          },
        }
      }
    >
      {
        props.elements.map((element, index) => {
          let containerClass = "gallery-item-container--sm"
          if ( ! /\.(png|jpe?g|svg)$/.test(element.image) ) {
            const imageKey = path.basename(element.image)
            const imageSize = sizeArray[Math.floor(Math.random()*sizeArray.length)]
            containerClass = `gallery-item-container--${imageSize}`
            console.log(containerClass)
            element.image = path.join(element.image, `${imageKey}-${imageSize}.png` )
          }
          return (
            <div
              key={ index }
              className={
                cx(
                  styles["gallery-item-container"],
                  styles[containerClass],
                )
              }
            >
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
  elements: PropTypes.arrayOf(React.PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  })).isRequired,
}

export default Gallery

import path from "path"

import React, { PropTypes } from "react"
import cx from "classnames"

import Isotope from "../Isotope"

import styles from "./index.css"

class Gallery extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.sizeArray = [
      "sm",
      "large",
      "high",
      "double"
    ]

    this.elements = this.props.elements.map((element, index) => {
      let containerClass = "gallery-item-container--sm"
      if ( ! /\.(png|jpe?g|svg)$/.test(element.image) ) {
        const imageKey = path.basename(element.image)
        const imageSize = this.sizeArray[Math.floor(Math.random()*this.sizeArray.length)]
        containerClass = `gallery-item-container--${imageSize}`
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

  render() {
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
          this.elements
        }
      </Isotope>
    )
  }
}

Gallery.propTypes = {
  elements: PropTypes.arrayOf(React.PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  })).isRequired,
}

export default Gallery

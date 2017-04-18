import path from "path"

import React, { PropTypes } from "react"
import cx from "classnames"
import _ from "lodash"

import Isotope from "../Isotope"

import styles from "./index.css"

class Gallery extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.sizeArray = [
      "small",
      "large",
      "high",
      "double"
    ]

    this.elements = _.shuffle(this.props.elements).map((element, index) => {
      let containerClass = "gallery-item-container--small"
      let elementImage = element.image
      if ( ! /\.(png|jpe?g|svg)$/.test(element.image) ) {
        const imageKey = path.basename(element.image)
        const imageSize = this.sizeArray[Math.floor(Math.random()*this.sizeArray.length)]
        containerClass = `gallery-item-container--${imageSize}`
        elementImage = path.join(element.image, `${imageKey}-${imageSize}.png` )
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
              <img src={ elementImage } />
            </a>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <Isotope
        className={ styles.gallery }
        isoOptions={
        {
          itemSelector: `.${styles["gallery-item-container"]}`,
          layoutMode: 'packery',
          packery: {
            gutter: 10
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

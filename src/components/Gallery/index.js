import React, { PropTypes } from "react"
import cx from "classnames"
import driveway from "driveway/dist/driveway.css"

import styles from "./index.css"

const Gallery = (props) => {
  return (
    <div className={ driveway.dw }>
      {
        
        React.Children.map(props.children, (element) => {
          return (
            <div
              className={
                cx(
                  driveway["dw-panel"],
                  styles.panel,
                )
              }
            >
              {
                React.cloneElement(
                  element,
                  {
                    className: cx(
                      element.className,
                      driveway["dw-panel__content"],
                      styles.element,
                    ),
                  },
                )
              }
            </div>
          )
        })
      }
    </div>
  )
}

Gallery.propTypes = {
  children: PropTypes.node,
}

export default Gallery

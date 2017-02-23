import React, { PropTypes } from "react"
import { Col } from "react-flexbox-grid/lib"

import styles from "./index.css"

const Box = (props) => {
  return (
    <Col { ...props }>
      <div className={ styles[props.type] }>
        { props.children }
      </div>
    </Col>
  )
}

Box.propTypes = {
  type: PropTypes.oneOf([ "row", "container", "nested", "large" ]).isRequired,
  children: PropTypes.node,
}

export default Box
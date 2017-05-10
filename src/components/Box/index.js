import React from "react"
import PropTypes from "prop-types"
import { Col } from "react-styled-flexboxgrid"

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

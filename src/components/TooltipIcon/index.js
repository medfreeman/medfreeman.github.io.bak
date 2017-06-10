import React from "react"
import PropTypes from "prop-types"
import IconButton from "react-toolbox/lib/button"
import Tooltip from "react-toolbox/lib/tooltip"

const TooltipButton = Tooltip(IconButton)

const TooltipIcon = props => {

  const { floating, ...otherProps } = props
  if ( props.icon && props.icon.startsWith("mf-") ) {
    otherProps.icon = (
      <i className={ "mf-icons" }>
        { props.icon.substr(3) }
      </i>
    )
  }
  if (floating === "true") {
    otherProps.floating = true
  }

  return (
    <TooltipButton
      { ...otherProps }
    />
  )
}

TooltipIcon.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  floating: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  tooltip: PropTypes.any.isRequired,
  theme: PropTypes.object,
}

export default TooltipIcon

import React, { PropTypes } from "react"

import remarkPlugins from "./remark-plugins.js"

const MarkdownBodyContainer = props => {
  const { children, ...otherProps } = props

  const child = remarkPlugins(children).contents

  return (
    <div
      className="phenomic-BodyContainer"
      { ...otherProps }
    >
      { child }
    </div>
  )
}

MarkdownBodyContainer.propTypes = {
  children: PropTypes.string,   // Markdown post containing the react-div
}

export default MarkdownBodyContainer

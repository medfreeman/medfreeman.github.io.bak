import React from "react"

import LatestPosts from "../../components/LatestPosts"
import Page from "../Page"

const Blog = (props) => {
  return (
    <Page { ...props }>
      <LatestPosts />
    </Page>
  )
}

export default Blog

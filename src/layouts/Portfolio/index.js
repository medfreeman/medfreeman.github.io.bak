import React from "react"

import Gallery from "../../components/Gallery"
import Page from "../Page"

const Portfolio = (props) => {
  return (
    <Page { ...props }>
      <Gallery>
        <img src="http://www.thegreenage.co.uk/wp-content/uploads/2013/02/how-to-insulate-a-wall-780x350.jpg" />
      </Gallery>
    </Page>
  )
}

export default Portfolio

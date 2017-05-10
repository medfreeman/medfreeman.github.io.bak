import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { Grid, Row } from "react-styled-flexboxgrid"
import warning from "warning"
import { joinUri } from "phenomic"

import Loading from "../../components/Loading"
import Box from "../../components/Box"
import MarkdownBodyContainer from "../../components/MarkdownBodyContainer"

import styles from "./index.css"

const Page = (
  {
    isLoading,
    __filename,
    __url,
    head,
    body,
    header,
    footer,
    children,
  },
  {
    metadata: { pkg },
  }
) => {
  warning(
    typeof head.title === "string",
    `Your page '${ __filename }' needs a title`
  )

  const metaTitle = head.metaTitle ? head.metaTitle : head.title

  const socialImage = head.hero && head.hero.match("://") ? head.hero
    : joinUri(process.env.PHENOMIC_USER_URL, head.hero)

  const meta = [
    { property: "og:type", content: "article" },
    { property: "og:title", content: metaTitle },
    {
      property: "og:url",
      content: joinUri(process.env.PHENOMIC_USER_URL, __url),
    },
    { property: "og:image", content: socialImage },
    { property: "og:description", content: head.description },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: metaTitle },
    { name: "twitter:creator", content: `@${ pkg.twitter }` },
    { name: "twitter:description", content: head.description },
    { name: "twitter:image", content: socialImage },
    { name: "description", content: head.description },
  ]

  return (
    <div className={ styles.page }>
      <Helmet
        title={ metaTitle }
        meta={ meta }
      />
      <Grid className={ styles.grid } fluid>
        <Row>
          <Box type="row" xs={ 12 } lg={ 4 }>
            { "Left!" }
          </Box>
          <Box type="row" xs={ 12 } lg={ 4 }>
            { head.hero &&
              <img alt="" src={ head.hero } width="100%" height="100%" />
            }
          </Box>
          <Box type="row" xs={ 12 } lg={ 4 }>
            { "Right!" }
          </Box>
        </Row>
      </Grid>
      <div className={ styles.wrapper + " " + styles.pageContent }>
        { header }
        <div className={ styles.body }>
          {
            isLoading
            ? <Loading />
            : <MarkdownBodyContainer>{ body }</MarkdownBodyContainer>
          }
        </div>
        { children }
        { footer }
      </div>
    </div>
  )
}

Page.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  __filename: PropTypes.string,
  __url: PropTypes.string,
  head: PropTypes.object.isRequired,
  body: PropTypes.string,
  header: PropTypes.element,
  footer: PropTypes.element,
}

Page.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

export default Page

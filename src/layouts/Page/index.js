import React, { PropTypes } from "react"
import Helmet from "react-helmet"
import warning from "warning"
import { BodyContainer, joinUri } from "phenomic"

import {css} from "glamor"
import {mainStyles, maxWidth, colorPrimary, Fjalla, colorSecondary, Lora} from "../../style-vars"
import {toCSS} from "../../style-helpers"

// import Button from "../../components/Button"
import Loading from "../../components/Loading"
import Header from "../../components/Header"
import Content from "../../components/Content"
import Footer from "../../components/Footer"

var styles = {
  page: css({
    ...mainStyles.html,
    ...mainStyles.text,
    display: 'flex',
    flexDirection: 'column',
  }),

  wrapper: css({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    maxWidth: toCSS(maxWidth),
    padding: '1rem 0.75rem'
  }),

  header: css({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '4vh',
    padding: '4vh 0',
    textAlign: 'center',
  }),

  heading: css({
    fontFamily: Fjalla,
    color: colorPrimary,
    letterSpacing: '1px',
    lineHeight: '2rem',
  }),

  cta: css({
    marginTop: '2rem',
  }),

  pageContent: css({
    margin: '1rem 0',
  }),

  body: css({
    fontFamily: Lora,
    fontWeight: "normal",
    '& a': css({
      color: colorPrimary,
      transition: 'all 0.2s',
      textDecoration: 'none',
      borderBottom: '1px solid transparent',

      ':hover': {
        opacity: 1,
        color: colorSecondary,
        borderBottomColor: colorSecondary,
      }
    }),

    /* handy for content */
    '& img': css({
      maxWidth: '100%',
    }),
  }),
}

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

  const meta = [
    { property: "og:type", content: "article" },
    { property: "og:title", content: metaTitle },
    {
      property: "og:url",
      content: joinUri(process.env.PHENOMIC_USER_URL, __url),
    },
    { property: "og:description", content: head.description },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: metaTitle },
    { name: "twitter:creator", content: `@${ pkg.twitter }` },
    { name: "twitter:description", content: head.description },
    { name: "description", content: head.description },
  ]

  return (
    <Content>
    <div {...styles.page}>
      <Helmet
        title={ metaTitle }
        meta={ meta }
      />
      <Header />
      <div {...styles.wrapper} {...styles.pageContent}>
        <div {...styles.header} >
          <h1 {...styles.heading}>
            {head.title} 
          </h1>
        </div>
        { header }
        <div {...styles.body}>
          {
            isLoading
            ? <Loading />
            : <BodyContainer>{ body } {children}</BodyContainer>
          }
        </div>
        { footer }
      </div>
      <Footer />
    </div>
    </Content>
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

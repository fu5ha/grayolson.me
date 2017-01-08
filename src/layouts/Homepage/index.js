import React, { PropTypes } from "react"
import Helmet from "react-helmet"
import { joinUri } from "phenomic"
import { css } from "glamor"

import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Hero from "../../components/Hero"
// import Art from "../../components/Art"
// import Photos from "../../components/Photos"
// import Code from "../../components/Code"
// import ProjectsPreview from "../../components/ProjectsPreview"
// import BlogPreview from "../../components/BlogPreview"

import {mainStyles} from "../../style-vars"

const styles = {
    html: css(mainStyles.html),
    body: css(mainStyles.text)
}

const Homepage = (
    {
        __url,
        head
    },
) => {
    const metaTitle = head.title
    const meta = [
      { property: "og:type", content: "article" },
      { property: "og:title", content: metaTitle },
      {
      property: "og:url",
      content: joinUri(process.env.PHENOMIC_USER_URL, __url),
      }
    ]
  
    return(
        <div className={css(styles.html, styles.body)}>
            <Helmet title={ metaTitle }
                    meta={ meta } />
            <Header />
            <Hero />
            <Footer />
        </div>
    )
}

                // <Art />
                // <Photos />
                // <Code />
                // <ProjectsPreview />
                // <BlogPreview />

Homepage.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  __filename: PropTypes.string,
  __url: PropTypes.string,
  head: PropTypes.object.isRequired,
  body: PropTypes.string,
  header: PropTypes.element,
  footer: PropTypes.element,
}

Homepage.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

export default Homepage
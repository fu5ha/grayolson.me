import React, { PropTypes } from "react"
import Helmet from "react-helmet"
import { BodyContainer, joinUri } from "phenomic"
import { StyleSheet, css } from "aphrodite"

import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Hero from "../../components/Hero"
// import Art from "../../components/Art"
// import Photos from "../../components/Photos"
// import Code from "../../components/Code"
// import ProjectsPreview from "../../components/ProjectsPreview"
// import BlogPreview from "../../components/BlogPreview"

import {mainStyles} from "../../style-vars"

const styles = StyleSheet.create({
    html: mainStyles.html,
    body: mainStyles.text
})

const Homepage = (
    {
        __url,
        children,
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
        <div className={css(styles.html)}>
            <Helmet title={ metaTitle }
                    meta={ meta } />
            <Header />
            <BodyContainer className={css(styles.body)} >
                <Hero />
                {children}
            </BodyContainer>
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
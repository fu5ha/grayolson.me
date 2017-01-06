import React, { PropTypes } from "react"
import Helmet from "react-helmet"
import { BodyContainer, joinUri } from "phenomic"
import { StyleSheet, css } from "aphrodite"

import {mainStyles} from "../../style-vars"

const styles = StyleSheet.create({
    html: mainStyles.html,
    body: mainStyles.text
})

const LandingPage = (
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
  
    return(
        <div className={css(styles.html)}>
            <Helmet title={ metaTitle }
                    meta={ meta } />
            <BodyContainer className={css(styles.body)} >{ body }</BodyContainer>
        </div>
    )
}

LandingPage.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  __filename: PropTypes.string,
  __url: PropTypes.string,
  head: PropTypes.object.isRequired,
  body: PropTypes.string,
  header: PropTypes.element,
  footer: PropTypes.element,
}

LandingPage.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

export default LandingPage
import React, { PropTypes } from "react"
import enhanceCollection from "phenomic/lib/enhance-collection"
import {css} from "glamor"

import PagesList from "../../components/PagesList"

import {Fjalla} from "../../style-vars"

var styles = {
  latestPosts: css({
    marginTop: "4rem",
    fontFamily: Fjalla,
    textAlign: 'center',
  })
}

const defaultNumberOfPosts = 2

const LatestPosts = (props, { collection }) => {
  const latestPosts = enhanceCollection(collection, {
    filter: ({ layout, title }) => {
      let isPost = layout == "Post"
      let notCurrentPost = title != props.pageTitle
      return isPost && notCurrentPost
    },
    sort: "date",
    reverse: true,
  })
  .slice(0, props.numberOfPosts || defaultNumberOfPosts)

  return (
    <div>
      <h2 {...styles.latestPosts}>
        { "Latest Posts".toLowerCase() }
      </h2>
      <PagesList pages={ latestPosts } />
    </div>
  )
}

LatestPosts.propTypes = {
  numberOfPosts: PropTypes.number,
  pageTitle: PropTypes.string
}

LatestPosts.contextTypes = {
  collection: PropTypes.array.isRequired,
}

export default LatestPosts

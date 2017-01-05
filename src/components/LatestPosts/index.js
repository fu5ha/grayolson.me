import React, { PropTypes } from "react"
import enhanceCollection from "phenomic/lib/enhance-collection"
import {StyleSheet, css} from "aphrodite"

import PagesList from "../../components/PagesList"

var styles = StyleSheet.create({
  latestPosts: {
    'text-align': 'center',
  }
})

const defaultNumberOfPosts = 6

const LatestPosts = (props, { collection }) => {
  const latestPosts = enhanceCollection(collection, {
    filter: { layout: "Post" },
    sort: "date",
    reverse: true,
  })
  .slice(0, props.numberOfPosts || defaultNumberOfPosts)

  return (
    <div>
      <h2 className={ css(styles.latestPosts) }>
        { "Latest Posts" }
      </h2>
      <PagesList pages={ latestPosts } />
    </div>
  )
}

LatestPosts.propTypes = {
  numberOfPosts: PropTypes.number,
}

LatestPosts.contextTypes = {
  collection: PropTypes.array.isRequired,
}

export default LatestPosts

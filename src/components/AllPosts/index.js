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
  const allPosts = enhanceCollection(collection, {
    filter: { layout: "Post" },
    sort: "date",
    reverse: true,
  })
  const latestPosts = enhanceCollection(allPosts, {
    filter: ({featured}) => featured !== true,
    sort: "date",
    reverse: true,
  }).slice(0, props.numberOfPosts || defaultNumberOfPosts)
  var otherPosts = false;
  if (latestPosts.length < allPosts.length) {
    otherPosts = allPosts.slice(defaultNumberOfPosts, allPosts.length)
  }

  return (
    <div>
      <h2 {...styles.latestPosts}>
        { "Latest Posts" }
      </h2>
      <PagesList pages={ latestPosts } />
      {
        otherPosts &&
        <PagesList small pages={otherPosts} />
      }
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

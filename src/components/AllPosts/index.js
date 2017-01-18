import React, { PropTypes } from "react"
import enhanceCollection from "phenomic/lib/enhance-collection"
import {css} from "glamor"

import PagesList from "../../components/PagesList"

import {HeaderFont} from "../../style-vars"

var styles = {
  latestPosts: css({
    marginTop: "4rem",
    fontFamily: HeaderFont,
    textAlign: 'center',
  })
}

const defaultNumberOfPosts = 2

const LatestPosts = (props, { collection }) => {
  const allPosts = enhanceCollection(collection, {
    filter: ({layout, featured}) => layout == "Post" && !featured,
    sort: "date",
    reverse: true,
  })
  const latestPosts = allPosts.slice(0, props.numberOfPosts || defaultNumberOfPosts)
  var otherPosts = false;
  if (latestPosts.length < allPosts.length) {
    otherPosts = allPosts.slice(defaultNumberOfPosts, allPosts.length)
  }

  return (
    <div>
      <h2 {...styles.latestPosts}>
        { "Other Posts" }
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

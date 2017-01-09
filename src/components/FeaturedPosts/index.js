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


const FeaturedPosts = (props, { collection }) => {
  const featuredPosts = enhanceCollection(collection, {
    filter: ({featured}) => featured == true,
    sort: "date",
    reverse: true,
  })

  return (
    <div>
      <h2 {...styles.latestPosts}>
        { "Featured Posts".toLowerCase() }
      </h2>
      <PagesList pages={ featuredPosts } />
    </div>
  )
}

FeaturedPosts.propTypes = {
  numberOfPosts: PropTypes.number,
}

FeaturedPosts.contextTypes = {
  collection: PropTypes.array.isRequired,
}

export default FeaturedPosts

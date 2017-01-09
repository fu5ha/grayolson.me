import React, { PropTypes } from "react"
import {css} from "glamor"

import PagePreview from "../PagePreview"

var styles = {
  list: css({
    display: 'flex',
    flexDirection: 'column',

    listStyle: 'none',
    padding: 0,
  })
}


const PagesList = ({ pages, small }) => {
  return (
    <div>
      {
      pages.length
      ? (
        <ul {...styles.list}>
          {
          pages.map((page) => (
            <li key={ page.title }><PagePreview small={small} { ...page } /></li>
          ))
        }
        </ul>
      )
      : "No posts yet."
    }
    </div>
  )
}

PagesList.propTypes = {
  pages: PropTypes.array.isRequired,
  small: PropTypes.bool,
}

export default PagesList

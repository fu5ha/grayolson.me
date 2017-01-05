import React, { PropTypes } from "react"
import {StyleSheet, css} from "aphrodite"

import PagePreview from "../PagePreview"

var styles = StyleSheet.create({
  list: {
    display: 'flex',
    'flex-direction': 'column',

    'list-style': 'none',
    padding: 0,
  }
})


const PagesList = ({ pages }) => {
  return (
    <div>
      {
      pages.length
      ? (
        <ul className={ css(styles.list) }>
          {
          pages.map((page) => (
            <li key={ page.title }><PagePreview { ...page } /></li>
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
}

export default PagesList

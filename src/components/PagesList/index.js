import React, { PropTypes } from "react"
import {css} from "aphrodite"

import PagePreview from "../PagePreview"

import styles from "./styles"

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

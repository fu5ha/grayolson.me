import React, { PropTypes } from "react"
import { Link } from "phenomic"
import {css} from "aphrodite"

import Button from "../../components/Button"

import styles from "./styles"

const PagePreview = ({ __url, title, date, description }) => {
  const pageDate = date ? new Date(date) : null

  return (
    <div className={ css(styles.wrapper) }>
      <Link to={ __url } className={ css(styles.title) }>
        { title }
      </Link>
      <div className={ css(styles.meta) }>
        {
          pageDate &&
            <time key={ pageDate.toISOString() }>
              { pageDate.toDateString() }
            </time>
        }
      </div>
      <div className={ css(styles.description) }>
        { description }
        { " " }
      </div>
      <Link to={ __url } className={ css(styles.readMore) }>
        <Button secondary>{ "Read More →" }</Button>
      </Link>
    </div>
  )
}

PagePreview.propTypes = {
  __url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  description: PropTypes.string,
}

export default PagePreview

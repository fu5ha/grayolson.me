import React, { PropTypes } from "react"
import { Link } from "phenomic"
import {StyleSheet, css} from "aphrodite"

import Button from "../../components/Button"

var styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    'flex-direction': 'column',
    'max-width': '40rem',
    margin: '1rem auto',
    padding: '1rem 0',
  },

  title: {
    'align-self': 'center',
    'font-size': '1.2rem',
    'font-weight': '900',
  },

  meta: {
    'font-size': '0.75rem',
    opacity: '0.6',
  },

  description: {
    'font-size': '0.85rem',
  },

  readMore: {
    /* align-self: center; */
    display: 'inline-flex',
    'margin-top': '1rem',
    'border-radius': '3px',
    'font-size': '0.8rem',
    'text-align': 'center',
    'border-bottom': '0 !important',
    'text-decoration': 'none !important',
  },
})

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

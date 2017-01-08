import React, { PropTypes } from "react"
import { Link } from "phenomic"
import {css} from "glamor"

import Button from "../../components/Button"

var styles = {
  wrapper: css({
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '40rem',
    margin: '1rem auto',
    padding: '1rem 0',
  }),

  title: css({
    alignSelf: 'center',
    fontSize: '1.2rem',
    fontWeight: '900',
  }),

  meta: css({
    fontSize: '0.75rem',
    opacity: '0.6',
  }),

  description: css({
    fontSize: '0.85rem',
  }),

  readMore: css({
    /* align-self: center; */
    display: 'inline-flex',
    marginTop: '1rem',
    borderRadius: '3px',
    fontSize: '0.8rem',
    textAlign: 'center',
    borderBottom: '0 !important',
    textDecoration: 'none !important',
  }),
}

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
        <Button>{ "Read More →" }</Button>
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

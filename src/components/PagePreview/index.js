import React, { PropTypes } from "react"
import { Link } from "phenomic"
import {css} from "glamor"

import Button from "../../components/Button"

import {Lato, colorPrimaryDark, colorPrimary, Lora} from "../../style-vars"

var styles = {
  wrapper: css({
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '40rem',
    margin: '1rem auto',
    padding: '1rem 0',
    fontFamily: Lora,
    fontWeight: "normal",
    lineHeight: 1.6,
    letterSpacing: '0.5px',
    '& a': css({
      color: colorPrimary,
      transition: 'all 0.2s',
      textDecoration: 'none',
      borderBottom: '1px solid transparent',

      ':hover': {
        opacity: 1,
        color: colorPrimaryDark,
        borderBottomColor: colorPrimaryDark,
      }
    }),
  }),
  
  smallWrapper: css({
    margin: '0.25rem auto',
    padding: '0',
  }),

  title: css({
    fontFamily: Lato,
    alignSelf: 'flex-start',
    fontSize: '1.2rem',
    textAlign: 'left',
    '& a': {
      color: colorPrimary,
    }
  }),

  meta: css({
    fontSize: '0.75rem',
    opacity: '0.6',
    textTransform: 'lowercase',
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

  small: css({
    display: 'inline-block',
    textAlign: 'left',
    alignSelf: 'flex-start',
  }),
}

const PagePreview = ({ __url, title, date, description, small }) => {
  const pageDate = date ? new Date(date) : null

  return (
    <div className={`${styles.wrapper} ${small && styles.smallWrapper}`}>
      <Link to={ __url } className={`${styles.title} ${small && styles.small}`}>
        { title }
      </Link>
      { small &&
          pageDate &&
          <time {...styles.meta} key={pageDate.toISOString() }>
            {pageDate.toDateString().toLowerCase()}
          </time>
      }
      { !small &&
        <div>
          <div {...styles.meta}>
          {
            pageDate &&
              <time key={ pageDate.toISOString() }>
                { pageDate.toDateString() }
              </time>
          }
          </div>
          <div {...styles.description}>
            { description }
            { " " }
          </div>
          <Link to={ __url } {...styles.readMore}>
            <Button>{ "Read More →".toLowerCase() }</Button>
          </Link>
        </div>
      }
    </div>
  )
}

PagePreview.propTypes = {
  __url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  description: PropTypes.string,
  small: PropTypes.bool,
}

export default PagePreview

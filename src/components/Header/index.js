import React, { PropTypes } from "react"
import { Link } from "phenomic"
import {css} from "glamor"
// import Scrollchor from "react-scrollchor"

import {colorText,Lato} from "../../style-vars"
import {toRem, toCSS} from "../../style-helpers"

var pseudo = {
  color: 'inherit',
  opacity: 1,
}

var navItemPadding = {
  val: 0.5,
  type: 'rem'
}

var navMaxWidth = {
  val: 40,
  type: 'rem'
}

var styles = {
  header: css({
    position: 'absolute',
    /* stretch */
    left: 0,
    right: 0,

    color: colorText,
    fontFamily: Lato,
    fontWeight: 600,
  }),

  nav: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: toRem(navMaxWidth.val + (navItemPadding.val * 2)),
    margin: '0 auto',
    padding: 0,
    lineHeight: '3rem',
  }),

  link: css({
    fontFamily: Lato,
    display: 'flex',
    alignItems: 'center',
    padding: '0 ' + toCSS(navItemPadding),
    color: 'inherit',
    textDecoration: 'none', 
    opacity: 0.4,
    transition: '0.4s all',
    borderBottom: '1px solid transparent',

    ':hover': pseudo,
    ':focus': pseudo,  
  }),
}

/*
function easeInOutQuad(x, t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t + b;
  return -c/2 * ((--t)*(t-2) - 1) + b;
}
*/

const Header = (props, { metadata: { pkg } }) => (
  <header className={ styles.header }>
    <nav className={ styles.nav }>
        <Link
          {...styles.link}
          to={ "/" }
        >
          about
        </Link>
        <Link
          { ...styles.link }
          to={ "/asteroids/" }
        >
          asteroids
        </Link>
        <a
          className={ styles.link }
          href={ "https://www.artstation.com/artist/termhn" }
        >
          { "art" }
        </a>
        <a
          className={ styles.link }
          href={ "http://flickr.com/grayolson" }
        >
          { "photos" }
        </a>
        {
          pkg.twitter &&
          <a
            href={ `https://twitter.com/${pkg.twitter}` }
            className={ styles.link }
          >
            { "twitter" }
          </a>
        }
        {
          pkg.repository &&
          <a
            href={ pkg.repository }
            className={ styles.link }
          >
            { "github" }
          </a>
        }
    </nav>
  </header>
)

Header.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

export default Header

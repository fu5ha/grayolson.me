import React, { PropTypes } from "react"
import { Link } from "phenomic"
import {StyleSheet, css} from "aphrodite"
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

var styles = StyleSheet.create({
  header: {
    position: 'absolute',
    /* stretch */
    left: 0,
    right: 0,

    color: colorText,
    fontFamily: Lato,
    fontWeight: 600,
  },

  nav: {
    display: 'flex',
    'flex-direction': 'row',
    'justify-content': 'space-between',
    'max-width': toRem(navMaxWidth.val + (navItemPadding.val * 2)),
    margin: '0 auto',
    padding: 0,
    'line-height': '3rem',
  },

  link: {
    display: 'flex',
    'align-items': 'center',
    padding: '0 ' + toCSS(navItemPadding),
    color: 'inherit',
    'text-decoration': 'none', 
    opacity: 0.4,
    transition: '0.4s all',
    'border-bottom': '1px solid transparent',

    ':hover': pseudo,
    ':focus': pseudo,  
  },
})

/*
function easeInOutQuad(x, t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t + b;
  return -c/2 * ((--t)*(t-2) - 1) + b;
}
*/

const Header = (props, { metadata: { pkg } }) => (
  <header className={ css(styles.header) }>
    <nav className={ css(styles.nav) }>
        <Link
          className={ css(styles.link) }
          to={ "/" }
        >
          { "about" }
        </Link>
        <Link
          className={ css(styles.link) }
          to={ "/asteroids/" }
        >
          { "asteroids" }
        </Link>
        <a
          className={ css(styles.link) }
          href={ "https://www.artstation.com/artist/termhn" }
        >
          { "art" }
        </a>
        <a
          className={ css(styles.link) }
          href={ "http://flickr.com/grayolson" }
        >
          { "photos" }
        </a>
        {
          pkg.twitter &&
          <a
            href={ `https://twitter.com/${pkg.twitter}` }
            className={ css(styles.link) }
          >
            { "twitter" }
          </a>
        }
        {
          pkg.repository &&
          <a
            href={ pkg.repository }
            className={ css(styles.link) }
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

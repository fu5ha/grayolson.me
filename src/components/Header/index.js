import React, { PropTypes } from "react"
import { Link } from "phenomic"
import Svg from "react-svg-inline"
import {StyleSheet, css} from "aphrodite"
import Scrollchor from "react-scrollchor"

import {colorNeutral} from "../../style-vars"
import {toRem, toCSS} from "../../style-helpers"

import twitterSvg from "../icons/iconmonstr-twitter-1.svg"
import gitHubSvg from "../icons/iconmonstr-github-1.svg"

var pseudo = {
      color: 'inherit',
      opacity: 1,
      'border-bottom-color': colorNeutral,
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

    color: colorNeutral,
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
    opacity: 0.6,
    transition: '0.4s all',
    'border-bottom': '1px solid transparent',

    ':hover': pseudo,
    ':focus': pseudo,  
    
    svg: {
      fill: 'currentColor',
      opacity: 0.5,
      'margin-right': '0.5rem',
      width: '14px',
      height: '14px',
      'vertical-align': 'middle',
    },
  },
})

function easeInOutQuad(x, t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t + b;
  return -c/2 * ((--t)*(t-2) - 1) + b;
}

const Header = (props, { metadata: { pkg } }) => (
  <header className={ css(styles.header) }>
    <nav className={ css(styles.nav) }>
        <Link
          className={ css(styles.link) }
          to={ "/" }
        >
          { "Home" }
        </Link>
        <Scrollchor
          className={ css(styles.link) }
          to="#test"
          animate={{offset:-100, easing: easeInOutQuad}}
        >
          { "Test" }
        </Scrollchor>
        {
          pkg.twitter &&
          <a
            href={ `https://twitter.com/${pkg.twitter}` }
            className={ css(styles.link) }
          >
            <Svg svg={ twitterSvg } cleanup />
            { "Twitter" }
          </a>
        }
        {
          pkg.repository &&
          <a
            href={ pkg.repository }
            className={ css(styles.link) }
          >
            <Svg svg={ gitHubSvg } cleanup />
            { "GitHub" }
          </a>
        }
    </nav>
  </header>
)

Header.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

export default Header

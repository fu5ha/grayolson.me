import React, { PropTypes } from "react"
import { Link } from "phenomic"
import Svg from "react-svg-inline"
import {StyleSheet, css} from "aphrodite"

import StyleVars from "../../style-vars"
import StyleHelpers from "../../style-helpers"

import twitterSvg from "../icons/iconmonstr-twitter-1.svg"
import gitHubSvg from "../icons/iconmonstr-github-1.svg"

var pseudo = {
      color: 'inherit',
      opacity: 1,
      'border-bottom-color': StyleVars.colorNeutralLight,
}

var navItemPadding = {
  val: 0.5,
  type: 'rem'
}

var styles = StyleSheet.create({
  header: {
    position: 'absolute',
    /* stretch */
    left: 0,
    right: 0,

    color: StyleVars.colorNeutralLight,
  },

  nav: {
    display: 'flex',
    'flex-direction': 'row',
    'justify-content': 'space-between',
    'max-width': StyleHelpers.toRem(StyleVars.maxWidth.val + (navItemPadding.val * 2)),
    margin: '0 auto',
    padding: 0,
    'line-height': '3rem',
  },

  navPart1: {
    display: 'flex',
    'flex-direction': 'row',
  },

  navPart2: {
    display: 'flex',
    'flex-direction': 'row',
  },

  link: {
    display: 'flex',
    'align-items': 'center',
    padding: '0 ' + StyleHelpers.toCSS(navItemPadding),
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

const Header = (props, { metadata: { pkg } }) => (
  <header className={ css(styles.header) }>
    <nav className={ css(styles.nav) }>
      <div className={ css(styles.navPart1) }>
        <Link
          className={ css(styles.link) }
          to={ "/" }
        >
          { "Home" }
        </Link>
      </div>
      <div className={ css(styles.navPart2) }>
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
      </div>
    </nav>
  </header>
)

Header.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

export default Header

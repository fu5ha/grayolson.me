import React, { PropTypes } from "react"
import {StyleSheet, css} from "aphrodite"
import cn from "classnames"

import StyleVars from "../../style-vars"
var {colorPrimary, colorPrimaryDark, colorNeutralLight, colorSecondary, colorSecondaryDark} = StyleVars
import StyleHelpers from '../../style-helpers'
var hexToRGBA = StyleHelpers.hexToRGBA

var styles = StyleSheet.create({
  button: {
    display: 'inline-flex',
    padding: '0 1rem',
    'line-height': '2rem',
    'font-weight': '100',
    'text-align': 'center',
    'border-radius': '3px',

    transition: '.2s all',

    color: colorPrimary,
    border: '1px solid ' + colorPrimary,
    background: hexToRGBA(colorNeutralLight, 0.2),

    ':hover': {
      'text-decoration': 'none',
      color: colorPrimaryDark,
      border: '1px solid ' + colorPrimaryDark,
    }
  },

  secondary: {
    color: colorSecondary,
    border: '1px solid ' + colorSecondary,

    ':hover': {
      color: colorSecondaryDark,
      border: '1px solid ' + colorSecondaryDark,
    },
  },

  light: {
    color: colorNeutralLight,
    border: '1px solid ' + colorNeutralLight,

    ':hover': {
      'text-decoration': 'none',
      color: colorNeutralLight,
      border: '1px solid ' + colorNeutralLight,
      background: hexToRGBA(colorNeutralLight, 0.3),
    }
  },


  big: {
    'font-size': '1.5rem',
    padding: '0 2rem',
    'line-height': '3rem',
  },
})

const Button = ({ className, secondary, light, big, ...otherProps }) => (
  <span
    role="button"
    { ...otherProps }
    className={cn({
      [className]: className,
      [css(
        styles.button,
        secondary ? styles.secondary : false,
        light ? styles.light : false,
        big ? styles.big : false
      )]: true 
    })}  />
)

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  secondary: PropTypes.bool,
  light: PropTypes.bool,
  big: PropTypes.bool,
}

Button.displayName = "Button"

export default Button

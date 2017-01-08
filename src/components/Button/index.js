import React, { PropTypes } from "react"
import {css} from "glamor"
import cn from "classnames"

import {colorPrimary, colorPrimaryDark, colorNeutralLight, colorSecondary, colorSecondaryDark} from "../../style-vars"
import {hexToRGBA} from '../../style-helpers'

var styles = {
  button: css({
    display: 'inline-flex',
    padding: '0 1rem',
    lineHeight: '2rem',
    fontWeight: '100',
    textAlign: 'center',
    borderRadius: '3px',

    transition: '.2s all',

    color: colorPrimary,
    border: '1px solid ' + colorPrimary,
    background: hexToRGBA(colorNeutralLight, 0.2),

    ':hover': {
      textDecoration: 'none',
      color: colorPrimaryDark,
      border: '1px solid ' + colorPrimaryDark,
    }
  }),

  secondary: css({
    color: colorSecondary,
    border: '1px solid ' + colorSecondary,

    ':hover': {
      color: colorSecondaryDark,
      border: '1px solid ' + colorSecondaryDark,
    },
  }),

  light: css({
    color: colorNeutralLight,
    border: '1px solid ' + colorNeutralLight,

    ':hover': {
      textDecoration: 'none',
      color: colorNeutralLight,
      border: '1px solid ' + colorNeutralLight,
      background: hexToRGBA(colorNeutralLight, 0.3),
    }
  }),


  big: css({
    fontSize: '1.5rem',
    padding: '0 2rem',
    lineHeight: '3rem',
  }),
}

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

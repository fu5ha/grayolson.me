import React, { PropTypes } from "react"
import {css} from "glamor"
import MobileNav from "../MobileNav"
import DesktopNav from "../DesktopNav"
import MediaQuery from "react-responsive"

import {colorText} from "../../style-vars"

var styles = {
  header: css({
    position: 'absolute',
    /* stretch */
    left: 0,
    right: 0,

    color: colorText,
  }),
}

const Header = (props) => {
  
  return (
    <header className={ styles.header }>
      <MediaQuery minWidth={550}>
      {(isDesktop) => {
        return isDesktop 
        ? <DesktopNav items={props.items} />
        : <MobileNav items={props.items} />
      }}
      </MediaQuery>
    </header>
  )
}

Header.propTypes = {
  items: PropTypes.array.isRequired,
}

Header.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

export default Header

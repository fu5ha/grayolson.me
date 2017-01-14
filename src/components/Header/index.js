import React, { PropTypes } from "react"
import {css} from "glamor"
//import MobileNav from "../MobileNav"
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
        if (!isDesktop) {
          var items = Array.from(props.items)
          var mobileItems = items.splice(0, items.length-2)
        }
        return isDesktop 
        ? <DesktopNav items={props.items} />
        : <DesktopNav items={mobileItems} /> //<MobileNav items={props.items} />
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

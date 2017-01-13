import React, {PropTypes} from "react"
import {css} from "glamor"
import Scrollchor from "react-scrollchor"
import {Link} from "phenomic"

import {toRem, toCSS} from "../../style-helpers"
import {Lato, easeInOutQuad} from "../../style-vars"


const navItemPadding = {
  val: 0.5,
  type: 'rem'
}
const navMaxWidth = {
  val: 40,
  type: 'rem'
}

var pseudo = {
  color: 'inherit',
  opacity: 1,
}

const styles = {
  nav: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: toRem(navMaxWidth.val + (navItemPadding.val * 2)),
    margin: '0 auto',
    padding: 0,
    lineHeight: '3rem',
  }),
  link: css({
    fontFamily: Lato,
    textAlign: 'center',
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

const externalLinkExp = /https?:/
const hashLinkExp = /^#/

const DesktopNav = ({items}) => (
    <nav className={ styles.nav }>
        {
            items.map(function(item) {
                if (externalLinkExp.test(item.to)) {
                    return (
                        <a href={item.to}
                            key={item.to}
                            {...styles.link} >
                            {item.text}
                        </a>
                    )
                } else if (hashLinkExp.test(item.to)) {
                    return (
                        <Scrollchor
                            key={item.to}
                            to={item.to}
                            {...styles.link}
                            animate={{
                                offset: -45, 
                                duration: 600, 
                                easing: easeInOutQuad
                            }} >
                            {item.text}
                        </Scrollchor>
                    )
                } else {
                    return (
                    <Link to={item.to}
                        key={item.to}
                        {...styles.link}>
                        {item.text}
                    </Link>
                    )
                }
            })
        }
    </nav>
)

DesktopNav.propTypes = {
    items: PropTypes.array
}

export default DesktopNav
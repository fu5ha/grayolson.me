import React, {PropTypes} from "react"
import hamburgerStyles from "./hamburgers.css"
import {css} from "glamor"

const styles = {
  nav: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0 auto',
    padding: 0,
    lineHeight: '3rem',
  }),
}

class MobileNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        }
    }
    handleClick = (e) => {
        e.preventDefault();
        var state = this.state;
        state.isOpen = !state.isOpen;
        this.setState(state);
    }

    render() {
        var hamburger = hamburgerStyles.hamburger + " " + hamburgerStyles.hamburgerEmphatic
        var hamburgerActive = hamburger + " " + hamburgerStyles.isActive
        return(
            <nav id="mobile-nav" {...styles.nav}>
                <button id="hamburger" onClick={this.handleClick} 
                    className={
                        this.state.isOpen 
                        ? hamburgerActive
                        : hamburger
                    } 
                    type="button">
                    <span className={hamburgerStyles.hamburgerBox}>
                        <span className={hamburgerStyles.hamburgerInner}></span>
                    </span>
                </button>
            </nav>
        )
    }
}

MobileNav.propTypes = {
    items: PropTypes.array
}

export default MobileNav
import React, { PropTypes } from "react"
import {css} from "aphrodite"
import styles from "./styles"

const Container = (props) => (
  <div className={ css(styles.container) }>
    { props.children }
  </div>
)

Container.propTypes = {
  children: PropTypes.node,
}

export default Container

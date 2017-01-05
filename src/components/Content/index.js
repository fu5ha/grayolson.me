import React, { PropTypes } from "react"
import {css} from "aphrodite"

import styles from "./index"

const Content = (props) => (
  <div className={ css(styles.content) }>
    { props.children }
  </div>
)

Content.propTypes = {
  children: PropTypes.node,
}

export default Content

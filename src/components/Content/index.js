import React, { PropTypes } from "react"
import {StyleSheet, css} from "aphrodite"

var styles =  StyleSheet.create({
  content: {
    flex: '1 1 auto',
    display: 'flex',
    'align-items': 'stretch',
    'flex-direction': 'column',
  }
})
const Content = (props) => (
  <div className={ css(styles.content) }>
    { props.children }
  </div>
)

Content.propTypes = {
  children: PropTypes.node,
}

export default Content

import React, { PropTypes } from "react"
import {StyleSheet, css} from "aphrodite"

var styles = StyleSheet.create({
  container: {
    'min-height': '100vh',
    display: 'flex',
    'flex-direction': 'column',
  },
  row: {
    'flex-direction': 'row',
  },
})

const Container = (props) => (
  <div className={ css(styles.container, props.row && styles.row) }>
    { props.children }
  </div>
)

Container.propTypes = {
  children: PropTypes.node,
  row: PropTypes.bool
}

export default Container

import React, { PropTypes } from "react"
import {StyleSheet, css} from "aphrodite"

var styles = StyleSheet.create({
  container: {
    'min-height': '100vh',
    display: 'flex',
    'flex-direction': 'column',
  }
})

const Container = (props) => (
  <div className={ css(styles.container) }>
    { props.children }
  </div>
)

Container.propTypes = {
  children: PropTypes.node,
}

export default Container

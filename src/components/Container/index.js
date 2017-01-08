import React, { PropTypes } from "react"
import {css} from "glamor"

var styles = {
  container: css({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  }),
  row: css({
    flexDirection: 'row',
  }),
}

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

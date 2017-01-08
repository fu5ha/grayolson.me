import React, { PropTypes } from "react"
import {css} from "glamor"

var styles =  {
  content: css({
    flex: '1 1 auto',
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
  }),
}
const Content = (props) => (
  <div {...styles.content}>
    { props.children }
  </div>
)

Content.propTypes = {
  children: PropTypes.node,
}

export default Content

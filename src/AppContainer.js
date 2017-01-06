import React, { PropTypes } from "react"

import "./index.global.css"
import "./highlight.global.css"

import Container from "./components/Container"
import DefaultHeadMeta from "./components/DefaultHeadMeta"

const AppContainer = (props) => (
  <Container>
    <DefaultHeadMeta />
      { props.children }
  </Container>
)

AppContainer.propTypes = {
  children: PropTypes.node,
}

export default AppContainer

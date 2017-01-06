import React, {Component, PropTypes} from "react"
import { Route } from "react-router"
import { PageContainer as PhenomicPageContainer } from "phenomic"

import AppContainer from "./AppContainer"
import Page from "./layouts/Page"
import PageError from "./layouts/PageError"
import Homepage from "./layouts/Homepage"
import Post from "./layouts/Post"
import LandingPage from "./layouts/LandingPage"

class PageContainer extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
  }

  render () {
    const {props} = this;
    return (
      <PhenomicPageContainer
        { ...props }
        layouts={{
          Page,
          PageError,
          Homepage,
          Post,
          LandingPage,
        }}
      />
    )
  }

  scrollToAnchor() {
    const hashParts = window.decodeURIComponent(window.location.hash).split('#')
    if (hashParts.length === 2) {
      const hash = hashParts.slice(-1)[0]
      document.getElementsByName(hash).scrollIntoView();
    }
  }
}

export default (
  <Route component={ AppContainer }>
    <Route path="*" component={ PageContainer } />
  </Route>
)

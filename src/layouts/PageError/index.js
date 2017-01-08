import React, { PropTypes } from "react"
import {css} from "glamor"

import Page from "../Page"

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
    padding: '1rem 0',
  }),

  oops: css({
    fontSize: '4rem',
    lineHeight: '4rem',
    color: '#ddd',
  }),

  title: css({
    margin: '4rem 0',
    fontSize: '2rem',
    lineHeight: '3rem',
    textAlign: 'center',
  }),
}


const PageError = ({ error, errorText }) => (
  <Page
    head={{
      // hero credit: https://www.flickr.com/photos/mypubliclands/16101654539/
      hero: "https://farm8.staticflickr.com/7559/16101654539_bee5151340_k.jpg",
    }}
  >
    <div {...styles.container}>
      <div {...styles.oops}>{ "😱 Oooops!" }</div>
      <div {...styles.text}>
        <p {...styles.title}>
          <strong>{ error }</strong>
          { " " }
          { errorText }
        </p>
        {
          error === 404 &&
          <div>
            { "It seems you found a broken link. " }
            { "Sorry about that. " }
            <br />
          </div>
        }
      </div>
    </div>
  </Page>
)

PageError.propTypes = {
  error: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  errorText: PropTypes.string,
}

PageError.defaultProps = {
  error: 404,
  errorText: "Page Not Found",
}

export default PageError

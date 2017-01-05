import React, { PropTypes } from "react"
import {StyleSheet, css} from "aphrodite"

import LatestPosts from "../../components/LatestPosts"
import Page from "../Page"

var styles = StyleSheet.create({
  header: {
    display: 'flex',
    'justify-content': 'center',
    opacity: 0.6,
    'font-size': '0.8rem',
    'margin-bottom': '1rem',
  }
})

const Post = (props) => {
  // it's up to you to choose what to do with this layout ;)
  const pageDate = props.head.date ? new Date(props.head.date) : null

  return (
    <Page
      { ...props }
      header={
        <div>
          <header className={ css(styles.header) }>
            {
              pageDate &&
              <time key={ pageDate.toISOString() }>
                { pageDate.toDateString() }
              </time>
            }
          </header>
        </div>
      }
    >
      <hr />
      <LatestPosts />
    </Page>
  )
}

Post.propTypes = {
  head: PropTypes.object.isRequired,
}

export default Post

import React, {PropTypes} from "react"
import {css} from "glamor"

import {colorNeutralLight, colorText, colorPrimary, Helvetica, Cormorant, maxWidth} from "../../style-vars"
import {toCSS} from "../../style-helpers"

var styles = {
  about: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: colorPrimary,
    fontFamily: Cormorant,
    color: colorText,
    fontSize: '2rem',
    lineHeight: '2.25rem',
    marginTop: '-30px',
  }),
  wrapper: css({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    maxWidth: toCSS(maxWidth),
    padding: '1rem 0.75rem',
    marginBottom: '6rem',
    marginTop: '5rem',
    ' h2': {
      fontFamily: Helvetica,
      fontWeight: 900,
      fontSize: '5rem',
      color: colorNeutralLight,
      alignSelf: 'center',
      margin: '3rem',
    },
    ' h3': {
      fontFamily: Helvetica,
      fontSize: '3rem',
      lineHeight: '3.5rem',
      alignSelf: 'center',
      textAlign: 'center',
      color: colorNeutralLight,
      '> strong': {
        padding: '5px 5px',
        background: colorNeutralLight,
        color: colorPrimary,
      },
      '@media(max-width: 320px)': {
        fontSize: '2.5rem',
        lineHeight: '3rem',
      },
      '@media(min-width: 750px)': {
        alignSelf: 'flex-start',
        textAlign: 'center',
        ':nth-of-type(2n)': {
          textAlign:'right',
          alignSelf: 'flex-end',
        },
      },
    },
    ' p': {
      alignSelf: 'center',
      textAlign: 'center',
      marginLeft: '0.5rem',
      marginRight: '0.5rem',
      '@media(min-width: 450px)': {
        marginLeft: '2rem',
        marginRight: '2rem',
      },
      '@media(min-width: 750px)': {
        maxWidth: '50rem',
        alignSelf: 'flex-start',
        textAlign: 'left',
        marginLeft: '3rem',
        marginRight: 'inherit',
        ':nth-of-type(2n)': {
          alignSelf: 'flex-end',
          textAlign:'right',
          marginLeft: 'inherit',
          marginRight: '3rem',
        },
      }
    },
  }),
}

const About = ({content}) => (
  <section id="about" {...styles.about}>
      <div {...styles.wrapper}
        dangerouslySetInnerHTML={{__html: content.innerHTML}}>
      </div>
  </section>
)

About.propTypes = {
  content: PropTypes.object
}

export default About
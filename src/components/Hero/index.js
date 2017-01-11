import React, {PropTypes} from "react"
import {css} from "glamor"

import {colorNeutralLight, Helvetica, colorPrimary, colorText} from "../../style-vars"
import {toRem} from "../../style-helpers"

const titleSize = 12.0
const leaderSize = 3.5
const styles = {
  titleDiv: css({
    flex: 1,
    textAlign: 'center',
    '> h1': {
      fontFamily: Helvetica,
      fontSize: toRem(titleSize),
      lineHeight: toRem(titleSize),
      color: colorPrimary,
      marginLeft: '1.5rem',
      marginTop: '0',
      '@media(max-width: 767px)': {
        fontSize: toRem(titleSize*2/3),
        lineHeight: toRem(titleSize*2/3),
        marginLeft: '1rem'
      },
      '@media(max-width: 374px)': {
        fontSize: toRem(titleSize*1/2),
        lineHeight: toRem(titleSize*1/2),
        marginLeft: '0.5rem'
      },
    },
    '> h2': {
      fontWeight: 200,
      fontFamily: Helvetica,
      fontSize: toRem(leaderSize),
      color: colorText,
      marginBottom: '-1rem',
      '@media(max-width: 767px)': {
        fontSize: toRem(leaderSize*2/3),
      },
      '@media(max-width: 374px)': {
        fontSize: toRem(leaderSize*1/2),
      },
    },
  }),
  hero: css({
    minHeight: '95vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorNeutralLight,
  }),
}

const Hero = ({content}) => (
  <section id="hero" {...styles.hero}>
    <div {...styles.titleDiv}
      dangerouslySetInnerHTML={{__html: content.innerHTML}}>
    </div>
  </section>
)

Hero.propTypes = {
  content: PropTypes.object,
}

export default Hero
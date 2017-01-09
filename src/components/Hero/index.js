import React from "react"
import {css} from "glamor"

import {colorNeutralLight, colorPrimary, colorText, Fjalla} from "../../style-vars"
import {toRem} from "../../style-helpers"

const titleSize = 12.0
const leaderSize = 3.5
const styles = {
  titleDiv: css({
    marginTop: '-3rem',
    flex: 1,
    textAlign: 'center',
  }),
  title: css({
    fontFamily: 'Helvetica, sans-serif',
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
  }),
  leader: css({
    fontWeight: 200,
    fontFamily: Fjalla,
    fontSize: toRem(leaderSize),
    color: colorText,
    marginBottom: '-1rem',
    '@media(max-width: 767px)': {
      fontSize: toRem(leaderSize*2/3),
    },
    '@media(max-width: 374px)': {
      fontSize: toRem(leaderSize*1/2),
    },
  }),
  hero: css({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorNeutralLight,
  }),
}

const Hero = () => (
  <section id="hero" {...styles.hero}>
    <div {...styles.titleDiv}>
      <h4 {...styles.leader}>hello, my name is</h4>
      <h1 {...styles.title}>gray.</h1>
    </div>
  </section>
)

export default Hero
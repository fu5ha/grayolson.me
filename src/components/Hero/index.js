import React from "react"
import {css} from "glamor"

import {Lato, colorNeutralLight, colorPrimary, colorText} from "../../style-vars"
import {toCSS} from "../../style-helpers"

const titleSize = {
  val: 12.0,
  type: 'rem'
}
const leaderSize = {
  val: 3.0,
  type: 'rem'
}
const styles = {
  titleDiv: css({
    marginTop: '-3rem',
    flex: 1,
    textAlign: 'center',
  }),
  title: css({
    fontSize: toCSS(titleSize),
    color: colorPrimary,
    marginLeft: '1.5rem',
    marginTop: '5%'
  }),
  leader: css({
    fontWeight: 200,
    fontFamily: Lato,
    fontSize: toCSS(leaderSize),
    color: colorText
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
  <section id="hero" className={ css(styles.hero) }>
    <div className={ css(styles.titleDiv) }>
      <h4 className={ css(styles.leader) }>hello, my name is</h4>
      <h1 className={ css(styles.title) }>gray.</h1>
    </div>
  </section>
)

export default Hero
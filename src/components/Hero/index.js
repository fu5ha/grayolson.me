import React from "react"
import {StyleSheet, css} from "aphrodite"

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
const styles = StyleSheet.create({
  titleDiv: {
    marginTop: '-3rem',
    flex: 1,
    textAlign: 'center',
  },
  title: {
    fontSize: toCSS(titleSize),
    color: colorPrimary,
    'margin-left': '1.5rem',
    'margin-top': '5%'
  },
  leader: {
    fontWeight: 200,
    fontFamily: Lato,
    fontSize: toCSS(leaderSize),
    color: colorText
  },
  hero: {
    minHeight: '100vh',
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    'background-color': colorNeutralLight,
  }
})

const Hero = () => (
  <section id="hero" className={ css(styles.hero) }>
    <div className={ css(styles.titleDiv) }>
      <h4 className={ css(styles.leader) }>hello, my name is</h4>
      <h1 className={ css(styles.title) }>gray.</h1>
    </div>
  </section>
)

export default Hero
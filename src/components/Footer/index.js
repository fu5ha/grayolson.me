import React from "react"
import {StyleSheet, css} from "aphrodite"

import {Lato} from "../../style-vars"

var styles = StyleSheet.create( {
  footer: {
    flex: 1,
    maxWidth: '40rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    fontFamily: Lato,
    'text-align': 'center',
  },
  
  footerContainer: {
    display: 'flex',
    aligntItems: 'center',
    justifyContent: 'center'
  },
  
  phenomicReference: {
    flex: 1,
    'font-size': '0.75rem',
    opacity: 0.6,
    color: 'inherit',
    'text-decoration': 'none',
  },

  phenomicReferenceName: {
    'font-weight': 'bold',
  },
  
  copy: {
    flex: 1,
    fontSize: '0.75rem',
    opacity: 0.8,
    color: 'inherit',
    'text-decoration': 'none'
  }
  
})


const Footer = () => (
  <footer className={ css(styles.footerContainer) }>
    <div className={ css(styles.footer) }>
      <p className={css(styles.copy)}>
        <span>&copy;</span> Gray Olson 2017
      </p>
      <p className={ css(styles.phenomicReference) }>
        <a
          href={ process.env.PHENOMIC_HOMEPAGE }
        >
          { "Created with " }
          <span className={ css(styles.phenomicReferenceName) }>
            {  `<${ process.env.PHENOMIC_NAME} />.` }
          </span>
        </a>
      </p>
    </div>
  </footer>
)

export default Footer

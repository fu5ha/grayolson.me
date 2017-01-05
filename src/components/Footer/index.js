import React from "react"
import {StyleSheet, css} from "aphrodite"

var styles = StyleSheet.create( {
  footer: {
    'text-align': 'center',
  },

  phenomicReference: {
    'font-size': '0.75rem',
    opacity: 0.6,
    color: 'inherit',
    'text-decoration': 'none',
  },

  phenomicReferenceName: {
    'font-weight': 100,
  },
  
})


const Footer = () => (
  <footer className={ css(styles.footer) }>
    { /* If you like Phenomic, this is a way to share the love ;) */ }
    <p>
      <a
        href={ process.env.PHENOMIC_HOMEPAGE }
        className={ css(styles.phenomicReference) }
      >
        { "Website generated with " }
        <span className={ css(styles.phenomicReferenceName) }>
          {  `<${ process.env.PHENOMIC_NAME} />` }
        </span>
      </a>
    </p>
  </footer>
)

export default Footer

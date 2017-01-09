import React from "react"
import {css} from "glamor"

import {Lato} from "../../style-vars"

var styles = {
  footer: css({
    flex: 1,
    maxWidth: '40rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    fontFamily: Lato,
    textAlign: 'center',
  }),
  
  footerContainer: css({
    display: 'flex',
    aligntItems: 'center',
    justifyContent: 'center'
  }),
  
  phenomicReference: css({
    flex: 1,
    fontSize: '0.75rem',
    opacity: 0.6,
    color: 'inherit',
    textDecoration: 'none',
    fontWeight: 'normal',
  }),

  phenomicReferenceName: css({
    fontWeight: 'bold',
  }),
  
  copy: css({
    flex: 1,
    fontSize: '0.75rem',
    opacity: 0.8,
    color: 'inherit',
    textDecoration: 'none',
    fontWeight: 'normal',
  }),
  
}


const Footer = () => (
  <footer {...styles.footerContainer}>
    <div {...styles.footer}>
      <p {...styles.copy}>
        <span>&copy;</span> { "Gray Olson 2017".toLowerCase() }
      </p>
      <p {...styles.phenomicReference}>
        <a
          href={ process.env.PHENOMIC_HOMEPAGE }
        >
          { "created with " }
          <span {...styles.phenomicReferenceName}>
            {  `<${ process.env.PHENOMIC_NAME} />.` }
          </span>
        </a>
      </p>
    </div>
  </footer>
)

export default Footer

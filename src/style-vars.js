// import {css} from 'glamor'

export const maxWidth = {
    val: 60,
    type: 'rem'
}
export const h1Size = {
    val: 8.0,
    type: 'rem'
}

export const Helvetica = "'Helvetica Neue', Helvetica"
export const Cormorant = "'Cormorant Garamond', serif"
export const Lato = "'Lato', sans-serif"
export const Fjalla = "'Fjalla One', sans-serif"
export const Lora = "'Lora', serif"

export const HeaderFont = Helvetica

export function easeInOutQuad(x, t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t + b;
  return -c/2 * ((--t)*(t-2) - 1) + b;
}

export var colorPrimaryDark =  "#84132B"
export var colorPrimary = "#Fb446f" //BG 2
export var colorDark = "#3C0511"
export var colorSecondaryDark = "#558C99"
export var colorSecondary = "#79c2cC"
export var colorNeutralDark = "#1D191F"
export var colorNeutral = "#3F222F" //BG 3
export var colorNeutralLight = "#FFF" //BG 1
export var colorText = "#1D191F"
export var colorTextDark = "#3C0511"
export var colorTextLight = "#8f8f8f"

export var mainStyles = {
    text: {
        color: colorText,
        fontSize: '1rem',
        lineHeight: '1.5rem',

        /* system font https://medium.com/designing-medium/system-shock-6b1dc6d6596f */
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    },
    
    html: {
        minHeight: '100%',
    }
}

export default {
    maxWidth, 
    colorText, 
    colorPrimary, 
    colorPrimaryDark, 
    colorSecondary, 
    colorSecondaryDark, 
    colorNeutral, 
    colorNeutralDark, 
    colorNeutralLight
}
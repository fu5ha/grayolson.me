import {lum} from "./style-helpers"
import {css} from 'glamor'

export var maxWidth = {
    val: 60,
    type: 'rem'
}
export var h1Size = {
    val: 8.0,
    type: 'rem'
}
export const Cormorant = css.fontFace({
    fontFamily: 'Cormorant',
    fontStyle: "normal",
    fontWeight: "normal",
    src: "local('Cormorant Garamond'), local(CormorantGaramondRegular), url('/assets/fonts/Cormorant_Garamond/CormorantGaramond-Regular.ttf') format('truetype')"
})
export const Lato = css.fontFace({
    fontFamily: 'Lato',
    fontStyle: "normal",
    fontWeight: "normal",
    src: "local('Lato Regular'), local(LatoRegular), url('/assets/fonts/Lato/Lato-Regular.ttf') format('truetype')"

})
export var colorPrimaryDark =  "#84132B"
export var colorPrimary = "#E66C7E"
export var colorDark = "3C0511"
export var colorSecondaryDark = "#558C99"
export var colorSecondary = "#89D2DC"
export var colorNeutralDark = "#1D191F"
export var colorNeutral = "#2F2F2F"
export var colorNeutralLight = "#FFF"
export var colorText = "#1D191F"
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
        background: lum(colorPrimary, .5)
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
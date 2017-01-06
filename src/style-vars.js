import {lum} from "./style-helpers"

export var maxWidth = {
        val: 60,
        type: 'rem'
    }
export var colorPrimaryDark =  "#84132B"
export var colorPrimary = "#E66C7E"
export var colorDark = "3C0511"
export var colorSecondaryDark = "#558C99"
export var colorSecondary = "#89D2DC"
export var colorNeutralDark = "#1D191F"
export var colorNeutral = "#2F2F2F"
export var colorNeutralLight = "#FFF"
export var colorText = "#1D191F"

export var mainStyles = {
    text: {
        color: colorText,
        'font-size': '1rem',
        'line-height': '1.5rem',

        /* system font https://medium.com/designing-medium/system-shock-6b1dc6d6596f */
        'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    },
    
    html: {
        'min-height': '100%',
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
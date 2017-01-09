// import {css} from 'glamor'

export var maxWidth = {
    val: 60,
    type: 'rem'
}
export var h1Size = {
    val: 8.0,
    type: 'rem'
}

/*export const Cormorant = css.fontFace({
    fontFamily: 'Cormorant',
    fontStyle: "normal",
    fontWeight: "normal",
    src: "local('Cormorant Garamond Medium'), local(CormorantGaramondMedium), url('/assets/fonts/Cormorant_Garamond/CormorantGaramond-Medium.ttf') format('truetype')"
})*/
/*export const CormorantLight = css.fontFace({
    fontFamily: 'Cormorant',
    fontStyle: "light",
    fontWeight: "light",
    src: "local('Cormorant Garamond Light'), local(CormorantGaramondLight), url('/assets/fonts/Cormorant_Garamond/CormorantGaramond-Light.ttf') format('truetype')"
})*/

export const Lato = "'Lato', sans-serif"/*css.fontFace({
    fontFamily: 'Lato',
    fontStyle: "normal",
    fontWeight: "normal",
    src: "local('Lato Regular'), local(LatoRegular), url('/assets/fonts/Lato/Lato-Regular.ttf') format('truetype')"

})*/
/*export const LatoLight = css.fontFace({
    fontFamily: 'Lato',
    fontStyle: "light",
    fontWeight: "light",
    src: "local('Lato Light'), local(LatoLight), url('/assets/fonts/Lato/Lato-Light.ttf') format('truetype')"
})*/

export const Fjalla = "'Fjalla One', sans-serif"/*css.fontFace({
    fontFamily: 'Fjalla',
    fontStyle: 'normal',
    fontWeight: 'normal',
    src: "local('Fjalla One'), local(FjallaOneRegular), url('/assets/fonts/Fjalla/FjallaOne-Regular.ttf') format('truetype')"
})*/

export const Lora = "'Lora', serif"/*css.fontFace({
    fontFamily: 'Lora',
    fontStyle: 'normal',
    fontWeight: 'normal',
    src: "local('Lora'), local(LoraRegular), url('/assets/fonts/Lora/Lora-Regular.ttf') format('truetype')"
})*/
/*export const LoraBold = css.fontFace({
    fontFamily: 'Lora',
    fontStyle: 'normal',
    fontWeight: 'bold',
    src: "local('Lora'), local(LoraBold), url('/assets/fonts/Lora/Lora-Bold.ttf') format('truetype')"
})*/

export var colorPrimaryDark =  "#84132B"
export var colorPrimary = "#F3315A" //BG 2
export var colorDark = "#3C0511"
export var colorSecondaryDark = "#558C99"
export var colorSecondary = "#89D2DC"
export var colorNeutralDark = "#1D191F"
export var colorNeutral = "#2F2F2F" //BG 3
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
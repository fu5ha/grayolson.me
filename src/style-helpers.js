var styleHelpers = {
    hexToRGBA: function(hex, a) {
        hex = hex.replace('#','')
        var r = parseInt(hex.substring(0,2),16)
        var g = parseInt(hex.substring(2,4),16)
        var b = parseInt(hex.substring(4,6),16)
        return `rgba(${r}, ${g}, ${b}, ${a})`
    },
    toCSS: function(style) {
        return '' + style.val + style.type
        
    },
    toRem: function(num) {
        return '' + num + 'rem'
    }
}

export default styleHelpers
function lim(val, max) {
    if (val >= max) {
        return max
    } else {
        return val
    }
}
var styleHelpers = {
    hexToRGBA: function(hex, a) {
        hex = hex.replace('#','')
        var r = parseInt(hex.substring(0,2),16)
        var g = parseInt(hex.substring(2,4),16)
        var b = parseInt(hex.substring(4,6),16)
        return `rgba(${r}, ${g}, ${b}, ${a})`
    },
    lum: function(hex, l) {
        hex = hex.replace('#','')
        var r = parseInt(hex.substring(0,2),16)
        var g = parseInt(hex.substring(2,4),16)
        var b = parseInt(hex.substring(4,6),16)
        r = lim(r * (1 + l), 255);
        b = lim(b * (1 + l), 255);
        g = lim(g * (1 + l), 255);
        r = r.toString(16);
        b = b.toString(16);
        g = g.toString(16);
        return `#${r}${g}${b}`
    },
    toCSS: function(style) {
        return '' + style.val + style.type
        
    },
    toRem: function(num) {
        return '' + num + 'rem'
    }
}

export default styleHelpers
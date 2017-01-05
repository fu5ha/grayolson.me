var styleHelpers = {
    hexToRGBA: function(hex, a) {
        var r = parseInt(hex.substring(1,2),16)
        var g = parseInt(hex.substring(2,4),16)
        var b = parseInt(hex.substring(4,6),16)
        return `rgba(${r}, ${g}, ${b}, ${a})`
    }
}

export default styleHelpers
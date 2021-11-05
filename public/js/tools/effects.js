



const effects = function (element, display = 'flex') {



    $('.content-hidden-header > button:first-child').on('click', (e) => {
        e.preventDefault()
        hidden().hide()
    })



    const fade = function (time, start, end, callback = false) {
        
        let increment = 0
        let opc = start

        if (start == 0) {
            increment = 2
            element.style.display = display
        }
        else {
            increment = -2
        }

        let run = setInterval(function(){
            if((opc == end)) {
                if(end == 0) {
                    element.style.display = 'none'
                }
                clearInterval(run)
                if (callback) callback()
            }
            else {
                opc += increment
                element.style.opacity = (opc / 100)
                element.style.filter = `alpha(opacity=${ opc })`
            }
        }, time * 10)
    }



    this.fadeIn = function (time, callback = false) {
        fade (time, 0, 100, callback)
    }



    this.fadeOut = function (time, callback = false) {
        fade (time, 100, 0, callback)
    }



    return this
}

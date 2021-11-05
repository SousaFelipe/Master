


$(function () {
    $('.nav-item').each(function (index) {
        const attr = $(this).attr('data-nav-item')

        if (window.location.href.includes(attr))
            $(this).addClass('active')
        else
            $(this).removeClass('active')
    })
})



const hidden = function () {



    const main = document.getElementsByClassName('main-content')[0]
    const container = document.getElementsByClassName('content-hidden')[0]



    this.show = function (beforeCallback = false, afterCallback = false) {

        if (beforeCallback) beforeCallback()
        
        effects(main).fadeOut(0.1, () => {
            effects(container).fadeIn(0.1, () => {
                if (afterCallback) afterCallback()
            })
        })
    }



    this.hide = function (beforeCallback = false, afterCallback = false) {

        if (beforeCallback) beforeCallback()

        effects(container).fadeOut(0.1, () => {
            effects(main).fadeIn(0.1, () => {
                if (afterCallback) afterCallback()
            })
        })
    }



    return this
}

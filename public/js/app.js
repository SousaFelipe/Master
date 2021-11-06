


$(document).ajaxStart(function () {
    Pace.restart()
})
.ajaxStop(function () {
    Pace.stop()
})
.ajaxError(function () {
    Pace.stop()
})
.ajaxComplete(function () {
    Pace.stop()
})



$(function () {
    if (window.APP == undefined) {
        window.APP = {

            form: (id) => {
                let element = document.getElementById(id)

                return {
                    submit: () => element.submit()
                }
            },

            component: (type, id) => {
                let element = document.getElementById(id)

                const components = {
                    'button':   () => buttonComponent(element),
                    'input':    () => inputComponent(element)
                }

                return (components[type])()
            }
        }
    }
})



function buttonComponent (element) {
    return {
        disable: () => element.setAttribute('disabled', true),
        enable:  () => element.setAttribute('disabled', false)
    }
}



function inputComponent (element) {
    return {
        invalidate: () => {
            element.classList.add('is-invalid')
            element.addEventListener('change', function(e) {
                element.classList.remove('is-invalid')
                element.removeEventListener('change', e)
            })
        }
    }
}

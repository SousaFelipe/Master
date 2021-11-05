


class Modal {


    constructor (id) {
        this.id = id

        this.element = document.getElementById(id)
        this.modal = this.element.childNodes[1]

        this.bindAction()
    }


    bindAction () {
        let closes = document.querySelectorAll(`[data-modal-close='${ this.id }']`)
        closes.forEach(close => close.addEventListener("click", () => this.close()))
    }


    show () {
        const modal = this.modal

        effects(this.element).fadeIn(0.5, () => {
            effects(modal).fadeIn(0.5)
        })

        return this
    }


    close (callOnClose = false) {
        const modal = this.modal

        effects(this.element).fadeOut(0.5, () => {
            effects(modal).fadeOut(0.5, callOnClose)
        })

        return this
    }
}

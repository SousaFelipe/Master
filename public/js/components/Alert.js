


class Alert {


    constructor (id, timeout = 0) {
        
        this.id = id
        this.timeout = timeout

        this.alert = document.getElementById(id)
        this.alertBody = document.getElementById(`${ id }Body`)

        this.bindAction()
    }


    bindAction () {
        let btnClose = document.querySelectorAll(`[data-alert-close='${ this.id }']`)[0]
        if (btnClose) {
            btnClose.addEventListener("click", () => this.hide())
        }
    }


    clearClasses () {
        $(this.alert).removeClass('success')
        $(this.alert).removeClass('warning')
        $(this.alert).removeClass('danger')
    }


    success (msg) {
        this.clearClasses()
        $(this.alert).addClass('success')
        return this.display(msg)
    }


    warning (msg) {
        this.clearClasses()
        $(this.alert).addClass('warning')
        return this.display(msg)
    }


    danger (msg) {
        this.clearClasses()
        $(this.alert).addClass('danger')
        return this.display(msg)
    }


    display (msg) {
        this.alertBody.innerHTML = msg

        effects(this.alert).fadeIn(0.5)

        if (this.timeout > 0) {
            setTimeout(() => { this.hide() }, this.timeout * 1000)
        }
    }


    hide () {
        const alertBody = this.alertBody

        effects(this.alert).fadeOut(0.5, () => {
            alertBody.innerHTML = ''
        })
    }
}




class Request {


    constructor (url, data = false) {

        this.url = url
        this.data = data

        /*$.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        })*/
    }


    options (method, stringify = true) {

        const options = {
            method: method,
            url: this.url,
            contentType: 'application/json',
            dataType: 'json'
        }

        return this.data
            ? { ...options, data: stringify ? JSON.stringify(this.data) : this.data }
            : { ...options }
    }


    redirect (assign = false) {
        
        if (assign) {
            history.pushState(null, null, document.URL)
            window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL)
            })
        }

        window.location.assign(this.url)
    }


    get (callback) {
        $.ajax(
            this.options('GET', false)
        )
        .done(async response => {
            callback.call(this, await response)
        })
    }


    post (callback) {
        this.send('POST', callback)
    }


    put (callback) {
        this.send('PUT', callback)
    }


    send (method, callback) {
        $.ajax(
            this.options(method)
        )
        .done(async response => {
            callback.call(this, await response)
        })
    }
}




const editable = function (jquerySelector, initialState = 'enabled') {



    let editableElements = $(jquerySelector)
    let onStateChangeFunction = null
    let editableCount = 0



    if (initialState == 'enabled') {
        editableCount = editableElements.length

        $(jquerySelector).removeAttr('readonly')
        $(jquerySelector).css('cursor', 'text')
    }
    else {
        editableCount = 0

        $(jquerySelector).attr('readonly', true)
        $(jquerySelector).css('cursor', 'pointer')
    }



    this.onStateChange = function (callback = false) {
        if (callback) {
            onStateChangeFunction = callback
        }
        else {
            return onStateChangeFunction(editableCount > 0)
        }
    }



    $(jquerySelector).dblclick(function (e) {
        const attr = $(this).attr('readonly')

        if (attr == 'readonly' || attr == true) {
            $(this).removeAttr('readonly')
            $(jquerySelector).css('cursor', 'text')

            editableCount++
        }
        else {
            $(this).attr('readonly', true)
            $(jquerySelector).css('cursor', 'pointer')

            editableCount--
        }

        if (onStateChangeFunction) onStateChange()
    })



    return this
}

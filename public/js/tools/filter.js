


const filter = function (selector, callback) {


    
    let dataset = []
    let validated = true
    let onInvalidateCallback = callback



    const useMask = function (element) {
        const filters = $(element).attr('data-filter')
        return filters.includes('mask')
    }



    const isInvalid = function (val) {
        return (val == undefined || val == null || val == '' || val == false)
    }



    const callWhenInvalid = function (element) {
        onInvalidateCallback.call(this, element)
    }



    const valueByElementType = function (element) {

        const tagName = element.get(0).tagName
        const uM = useMask(element)

        const types = {
            'INPUT':    () => (uM ? element.cleanVal() : element.val()),
            'SELECT':   () => (uM ? element.find(':selected').cleanVal() : element.find(':selected').val())
        }

        const value = (types[tagName])()
        dataset[element.attr('name')] = value

        return value
    }


    
    const findByFilter = function (filter) {
        const inputs = $(`*[${ selector }][data-filter]`)
        
        let toFilter = []
        let filters = ''

        $(inputs).each(function (index) {
            filters = $(this).attr('data-filter')

            if (filters.includes(filter)) {
                toFilter.push($(this))
            }

            filters = ''
        })

        return toFilter
    }



    const filterEmpties = function (empties) {

        let currentElement = null
        let currentValue = null

        $(empties).each(function (index) {

            currentElement = $(this)
            currentValue = valueByElementType(currentElement)
            
            if (isInvalid(currentValue)) {
                callWhenInvalid(currentElement)
                validated = false
            }
        })
    }



    filterEmpties( findByFilter('empty') )



    return validated ? Object.assign({}, dataset) : validated
}




let ispsTable = null
let tokensTable = null
let enabledEdit = false



$.extend($.fn.dataTable.defaults, {
    "autoWidth":    false,
    "searching":    false,
    "info":         false,
    "lengthChange": false,
    "pageLength":   10,
    language: {
        oPaginate: {
            sPrevious: '<i class="material-icons-two-tone">navigate_before</i>',
            sNext: '<i class="material-icons-two-tone">navigate_next</i>'
        }
    }
})


if ( ! $.fn.DataTable.isDataTable('#isps')) {
    ispsTable = $('#isps').DataTable({
        order: [[ 1, 'asc' ]],
        columnDefs: [
            { targets: [0, 1, 2], className: 'text-start' },
            { targets: [3], className: 'flex-row justify-end align-center', orderable: false }
        ]
    })
}


if ( ! $.fn.DataTable.isDataTable('#tokens')) {
    tokensTable = $('#tokens').DataTable({
        order: [[ 1, 'asc' ]],
        columnDefs: [
            { targets: [0, 1, 2, 3], className: 'text-start' },
            { targets: [4], className: 'flex-row justify-end align-center', orderable: false }
        ]
    })
}



$(function () {

    editable('*[id*="edit-"]', 'disabled')
        .onStateChange(enabled => { enabledEdit = enabled })

    $('.mask_cnpj').mask('00.000.000/0000-00', { reverse: true })
    $('.mask_telefone').mask('(00) 0 0000-0000', { reverse: false })
    $('.mask_cep').mask('00000-000', { reverse: false })
    $('.mask_ip').mask('0ZZ.0ZZ.0ZZ.0ZZ', { translation: { 'Z': { pattern: /[0-9]/, optional: true } }})

    requestProvedores()
})



function requestProvedores () {
    new Request('/isps/list')
        .get(async response => {
            const isps = await response.isps

            isps.forEach(provedor => {
                drawProvedor(provedor)
            })
        })
}



function drawProvedor (provedor) {

    ispsTable.row.add([
        text(provedor.cnpj).cnpj(),
        provedor.nome_fantasia,
        `${ provedor.logradouro }, ${ provedor.municipio }-${ provedor.uf }`,
        `<button type="button"
            class="btn sm bg-light-two"
            onclick="openProvedorDetalhes(${ provedor.id }, '${ escape(provedor.nome_fantasia) }')">
            <i class="material-icons-two-tone fs-lg">open_in_new</i>
        </button>`
    ])

    ispsTable.draw()
}



function openNewProvedorModal () {
    requestNewToken()
    new Modal('new-isp-modal').show()
}



function sendNewProvedor () {

    const data = filter(`class*="input-isp"`, (invalid) => {
            invalid.addClass('is-invalid')
            invalid.keyup(function (e) {
                e.preventDefault()
                invalid.removeClass('is-invalid')
            })
        })

    if (data) {
        new Request('/isps/store', { isp: data })
            .post(response => {
                if (response.inserido) {
                    drawProvedor(response.isp)
                    new Modal('new-isp-modal').close(() => { $('.input-isp').val('') })
                    new Alert('new-isp-alert', 5).success('Registro inserido com sucesso!')
                }
                else {
                    new Alert('new-isp-alert', 5).danger('Erro ao inserir registro!')
                }
            })
    }
    else {
        new Alert('new-isp-alert', 5).warning('Preencha todos os campos destacados!')
    }
}



function openProvedorDetalhes (id, fantasia) {

    new Request(`/isps/${ id }/show`)
        .get(async response => {
            const isp = await response.isp

            $('#edit-cnpj').val( text(isp.cnpj).cnpj() )
            $('#edit-razao').val( isp.razao )
            $('#edit-nome_fantasia').val( isp.nome_fantasia )
            $('#edit-email').val( isp.email )

            $(`#edit-porte option`)
                .removeAttr('selected')
                .filter(`[value="${ isp.porte }"]`)
                .attr('selected', true)

            $('#edit-empresa_telefone').val( text(isp.empresa_telefone).cell() )
            $('#edit-titular').val( isp.titular )
            $('#edit-titular_contato').val( text(isp.titular_contato).cell() )

            $(`#edit-class_responsavel option`)
                .removeAttr('selected')
                .filter(`[value="${ isp.class_responsavel }"]`)
                .attr('selected', true)

            $('#edit-logradouro').val( isp.logradouro )
            $('#edit-municipio').val( isp.municipio )
            $('#edit-cep').val( text(isp.cep).cep() )
            $('#edit-server_host').val( isp.server_host )

            $(`#edit-uf option`)
                .removeAttr('selected')
                .filter(`[value="${ isp.uf }"]`)
                .attr('selected', true)

            $('#edit-server_ip').val( isp.server_ip )
            $('#edit-token').val( isp.token )

        })

    hidden().show()
}



function requestNewToken () {
    new Request('/tokens/create')
        .get(async response => {
            const token = await response.token
            $('input[name="token"]').val(token)
        })
}



function requestTokens () {

}



function drawToken (token) {

}



function sendNewToken () {

}



function openTokenModal () {
    new Modal('new-token-modal').show()
}



function enableEdit () {
    enabledEdit = true
    $('#save-isp-buttons').fadeIn('fast')
    $('*[id*="edit-"]').removeAttr('readonly')
}



function disableEdit () {
    enabledEdit = false
    $('#save-isp-buttons').fadeOut('fast')
    $('*[id*="edit-"]').attr('readonly', 'readonly')
}



function toggleEdit () {
    if (enabledEdit) {
        disableEdit()
    }
    else {
        enableEdit()
    }
}

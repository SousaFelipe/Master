

const text = (clean) => {
    
    return {

        cell: () => clean.replace(/\D/g, '').replace(/^(\d{2})(\d{1})(\d{4})(\d{4})?/, '($1) $2 $3-$4'),

        cep: () => clean.replace(/\D/g, '').replace(/^(\d{5})(\d{3})?/, '$1-$2'),

        cnpj: (format = '$1.$2.$3/$4-$5') => clean.replace(/\D/g, '').replace(/^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/, format),

        date: (joiner = '/') => clean.split('-').reverse().join(joiner)
    }
}

import BaseSchema from '@ioc:Adonis/Lucid/Schema'



export default class Isps extends BaseSchema {
    protected tableName = 'isps'


    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.string('cnpj', 15).unique()
            table.string('razao', 64)
            table.string('nome_fantasia', 64)
            table.string('porte', 32)
            table.string('email', 64)
            table.string('empresa_telefone', 11)
            table.string('logradouro', 96)
            table.string('cep', 9)
            table.string('municipio', 96)
            table.string('uf', 2)
            table.string('titular', 96)
            table.string('titular_contato', 11)
            table.string('class_responsavel', 32)
            table.enum('status', ['P', 'A', 'B', 'C']).defaultTo('P')
            table.string('server_host', 32).unique()
            table.string('server_ip', 15).unique()
            table.string('token', 128).unique()
            table.timestamps(true)
        })
    }


    public async down () {
        this.schema.dropTable(this.tableName)
    }
}

import BaseSchema from '@ioc:Adonis/Lucid/Schema'



export default class Tokens extends BaseSchema {
    protected tableName = 'tokens'


    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.bigInteger('provedor')
            table.double('valor', 11, 2)
            table.date('validade')
            table.enum('tipo_vencimento', ['M', 'T', 'S', 'A']).defaultTo('S')
            table.date('data_vencimento')
            table.string('token', 128).unique()
            table.timestamps(true)
        })
    }

    public async down () {
        this.schema.dropTable(this.tableName)
    }
}

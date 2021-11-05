import BaseSchema from '@ioc:Adonis/Lucid/Schema'



export default class Users extends BaseSchema {
    protected tableName = 'users'


    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.string('name', 32)
            table.string('email', 32)
            table.string('password', 128)
            table.string('remember_token', 128)
            table.timestamps(true)
        })
    }


    public async down () {
        this.schema.dropTable(this.tableName)
    }
}

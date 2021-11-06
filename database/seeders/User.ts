import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import User from 'App/Models/User'



export default class UserSeeder extends BaseSeeder {
    public async run () {
        await User.create({
            name: 'Felipe Sousa',
            email: 'spark@spark.com',
            password: 'tmncfldpt101'
        })
    }
}

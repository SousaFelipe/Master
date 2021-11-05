
import { DateTime } from 'luxon'

import Encryption from '@ioc:Adonis/Core/Encryption'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'



export default class User extends BaseModel {

    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string

    @column({
        prepare: (value: string) => Encryption.encrypt(value),
        consume: (value: string) => Encryption.decrypt(value),
    })
    public email: string

    @column({ serializeAs: null })
    public password: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}

import { DateTime } from 'luxon'

import {
    BaseModel,
    column,
    computed
} from '@ioc:Adonis/Lucid/Orm'



export default class ApiToken extends BaseModel {



    @column({ isPrimary: true })
    public id: number

    @column({ serializeAs: 'user' })
    public user_id: number

    @column()
    public name: string

    @column()
    public type: string

    @column()
    public token: string

    @column.dateTime({ autoCreate: false, autoUpdate: false })
    public expiresAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}

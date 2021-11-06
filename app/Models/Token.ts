import { DateTime } from 'luxon'

import {
    BaseModel,
    column,
    computed
} from '@ioc:Adonis/Lucid/Orm'



export default class Token extends BaseModel {



    @column({ isPrimary: true })
    public id: number

    @column()
    public provedor: string

    @column()
    public valor: number

    @column()
    public tipo_vencimento: string

    @column.dateTime({ autoCreate: false, autoUpdate: false })
    public data_vencimento: DateTime

    @column()
    public token: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime



    @computed()
    public create () {
        let random = ''

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const charsLen = chars.length

        for (var i = 0; i < charsLen; i++)
            random += chars.charAt(Math.floor(Math.random() * charsLen))

        return random
    }
}

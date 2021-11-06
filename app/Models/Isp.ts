import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'



export default class Isp extends BaseModel {



    @column({ isPrimary: true })
    public id: number

    @column()
    public cnpj: string

    @column()
    public razao: string

    @column()
    public nome_fantasia: string

    @column()
    public porte: string

    @column()
    public email: string

    @column()
    public empresa_telefone: string

    @column()
    public logradouro: string

    @column()
    public cep: string

    @column()
    public municipio: string

    @column()
    public uf: string

    @column()
    public titular: string

    @column()
    public titular_contato: string

    @column()
    public class_responsavel: string

    @column()
    public status: string

    @column()
    public server_host: string

    @column()
    public server_ip: string

    @column()
    public token: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}

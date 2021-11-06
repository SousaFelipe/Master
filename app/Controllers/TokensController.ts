import { DateTime } from 'luxon'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Hash from '@ioc:Adonis/Core/Hash'



export default class TokensController {


    public async index ({ view, auth } : HttpContextContract) {
        await auth.use('web').authenticate()
        return view.render('admin/tokens')
    }


    public async list ({ auth } : HttpContextContract) {
        //await auth.use('web').authenticate()
    }


    public async show (ctx : HttpContextContract) {
        //await auth.use('web').authenticate()
    }


    public async create ({ auth } : HttpContextContract) {
        await auth.use('web').authenticate()

        const token = await Hash.make(DateTime.now().toString())

        return { token }
    }


    public async edit (ctx : HttpContextContract) {
        //await auth.use('web').authenticate()
    }


    public async destroy (ctx : HttpContextContract) {
        //await auth.use('web').authenticate()
    }
}

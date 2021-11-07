import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Token from 'App/Models/Token'



export default class TokensController {


    public async index ({ view, auth } : HttpContextContract) {
        await auth.use('web').authenticate()
        return view.render('admin/tokens')
    }


    public async list ({ auth, request } : HttpContextContract) {
        await auth.use('web').authenticate()

        let tokens = await Token
            .query()
            .where('id_isp', request.param('id_isp'))
            .select('*')

        return { tokens }
    }


    public async show ({ auth, request } : HttpContextContract) {
        await auth.use('web').authenticate()
        let token = await Token.find(request.param('id'))
        return { token }
    }


    public async create ({ auth } : HttpContextContract) {
        await auth.use('web').authenticate()
        let token = new Token().create()
        return { token }
    }


    public async edit ({ auth, request } : HttpContextContract) {
        await auth.use('web').authenticate()

        let token = await Token
            .query()
            .where('id', request.param('id'))
            .update(request.body())

        return { token }
    }


    public async destroy ({ auth, request } : HttpContextContract) {
        await auth.use('web').authenticate()

        let id = request.param('id')
        let token = await Token.findOrFail(id)

        await token.delete()

        let deleted = await Token
            .query()
            .where('id', id)
            .first()

        return { deleted: (deleted == null) }
    }
}

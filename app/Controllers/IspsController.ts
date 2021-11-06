import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Isp from 'App/Models/Isp'



export default class IspsController {


    public async index ({ view, auth } : HttpContextContract) {
        await auth.use('web').authenticate()

        return view.render('admin/isps')
    }


    public async list ({ auth } : HttpContextContract) {
        await auth.use('web').authenticate()

        const isps = await Isp.all()

        return { isps }
    }


    public async show (ctx : HttpContextContract) {
    }


    public async store ({ auth, request } : HttpContextContract) {
        await auth.use('web').authenticate()

        const isp = Isp.create(request.body())

        return {
            inserido: (isp != null),
            isp: isp
        }
    }


    public async edit (ctx : HttpContextContract) {

    }


    public async destroy (ctx : HttpContextContract) {

    }
}

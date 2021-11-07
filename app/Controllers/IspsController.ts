import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Isp from 'App/Models/Isp'



export default class IspsController {


    public async index ({ view, auth } : HttpContextContract) {
        await auth.use('web').authenticate()
        return view.render('admin/isps')
    }


    public async list ({ auth } : HttpContextContract) {
        await auth.use('web').authenticate()
        let isps = await Isp.all()
        return { isps }
    }


    public async show ({ auth, request } : HttpContextContract) {
        await auth.use('web').authenticate()
        let isp = await Isp.find(request.param('id'))
        return { isp }
    }


    public async store ({ auth, request } : HttpContextContract) {
        await auth.use('web').authenticate()

        let isp = await Isp.create(request.body().isp)
        let inserido = (isp != null)

        return { inserido, isp }
    }


    public async edit ({ auth, request } : HttpContextContract) {
        await auth.use('web').authenticate()

        let isp = await Isp
            .query()
            .where('id', request.param('id'))
            .update(request.body().isp)

        return { isp }
    }


    public async destroy ({ auth, request } : HttpContextContract) {
        await auth.use('web').authenticate()

        let id = request.param('id')
        let isp = await Isp.firstOrFail(id)

        await isp.delete()

        let deleted = await Isp
            .query()
            .where('id', id)
            .first()

        return { deleted: (deleted == null) }
    }
}

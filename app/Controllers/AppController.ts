import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'



export default class AppController {


    public async home ({ view } : HttpContextContract) {
        return view.render('home')
    }


    public async dashboard ({ view, auth } : HttpContextContract) {
        await auth.use('web').authenticate()

        return view.render('admin/dashboard')
    }


    public async isps ({ view, auth } : HttpContextContract) {
        await auth.use('web').authenticate()

        return view.render('admin/isps')
    }
}

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'

import langConfig from 'Config/lang'

import User from 'App/Models/User'



export default class LoginController {


    public async login ({ auth, request } : HttpContextContract) {

        const email = request.input('email')
        const password = request.input('password')
        const user = await User.findBy('email', email)

        if ( ! user) {
            return { errors: {
                email: langConfig.auth.email
            }}
        }

        try {

            if ( ! (await Hash.verify(user.password, password))) {
                return { errors: {
                    email: langConfig.auth.password
                }}
            }

            const token = await auth.use('api').attempt(email, password)
            return { errors: false, token }
        }
        catch {
            return { errors: {
                crash: langConfig.auth.crash
            }}
        }
    }


    public async logout ({ request, response } : HttpContextContract) {
        return response.send({
            method: request.intended()
        })
    }
}

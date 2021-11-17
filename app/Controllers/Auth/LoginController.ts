import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'

import langConfig from 'Config/lang'

import ApiToken from 'App/Models/ApiToken'
import User from 'App/Models/User'



export default class LoginController {


    public async login ({ auth, request, response } : HttpContextContract) {

        const email = request.input('email')
        const password = request.input('password')

        try {

            const user = await User.findBy('email', email)

            if ( ! user) {
                return response.send({ errors: {
                    email: langConfig.auth.email
                }})
            }

            if ( ! (await Hash.verify(user.password, password))) {
                return response.send({ errors: {
                    email: langConfig.auth.password
                }})
            }

            const token = await auth.use('api').attempt(email, password)
            return response.send({ errors: false, ...token })
        }
        catch {
            return response.send({ errors: {
                crash: langConfig.auth.crash
            }})
        }
    }


    public async auth ({ auth, response } : HttpContextContract) {
        await auth.use('api').authenticate()

        return response.send({
            user: auth.use('api').user
        })
    }


    public async logout ({ auth, response } : HttpContextContract) {
        await auth.use('api').revoke()

        return response.send({
            revoked: true
        })
    }
}

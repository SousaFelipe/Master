import Route from '@ioc:Adonis/Core/Route'



Route.get('/', 'AppController.home')



Route.group(() => {

    Route.post('/login', 'LoginController.login').as('auth.login')
    Route.post('/auth', 'LoginController.auth').as('auth.auth')
    Route.post('/logout', 'LoginController.logout').as('auth.logout')

})
.namespace('App/Controllers/Auth')



Route.group(() => {


    Route.get('/dashboard', 'AppController.dashboard')


    Route.group(() => {

        Route.get('/', 'IspsController.index')
        Route.get('/list', 'IspsController.list')
        Route.get('/:id/show', 'IspsController.show')
        Route.post('/store', 'IspsController.store')
        Route.put('/:id/edit', 'IspsController.edit')
        Route.delete('/:id/destroy', 'IspsController.destroy')

    }).prefix('/isps')


    Route.group(() => {

        Route.get('/', 'TokensController.index')
        Route.get('/:id_isp/list', 'TokensController.list')
        Route.get('/:id/show', 'TokensController.show')
        Route.get('/create', 'TokensController.create')
        Route.put('/:id/edit', 'TokensController.edit')
        Route.delete('/:id/destroy', 'TokensController.destroy')

    }).prefix('/tokens')

})
.middleware(['auth'])

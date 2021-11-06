import Route from '@ioc:Adonis/Core/Route'



Route.get('/', 'AppController.home')



Route.group(() => {

    Route.get('/login', 'LoginController.index').as('auth.index')
    Route.post('/login', 'LoginController.login').as('auth.login')
    Route.post('/logout', 'LoginController.logout').as('auth.logout')

})
.namespace('App/Controllers/Auth')



Route.group(() => {

    Route.get('/dashboard', 'AppController.dashboard')

    Route.group(() => {

        Route.get('/', 'IspsController.index')
        Route.get('/list', 'IspsController.list')
        Route.get('/:id/show', 'IspsController.show')
        Route.post('/create', 'IspsController.create')
        Route.put('/:id/edit', 'IspsController.edit')
        Route.delete('/:id/destroy', 'IspsController.destroy')

    }).prefix('/isps')

})
.middleware(['auth'])

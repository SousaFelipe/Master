import Route from '@ioc:Adonis/Core/Route'



Route.get('/', 'AppController.home')

Route.get('/login', 'AuthController.index')
Route.post('/login', 'AuthController.login')
Route.post('/logout', 'AuthController.logout')


Route.group(() => {


    Route.get('/dashboard', 'AppController.dashboard')
    Route.get('/isps', 'AppController.isps')


}).middleware(['auth'])

import BaseInicialsController from 'App/Controllers/Http/BaseInicialsController';
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

import User from 'App/Models/user'
const baseInicialsController = new BaseInicialsController()

Route.get('/', baseInicialsController.index )

Route.post('login', async ({ auth, request }) => {
    const email = request.input('email')
    const password = request.input('password')
  
    await auth.use('api').attempt(email, password)
  })


  Route.get('/createUser', async ({  }) => {

    const user = new User()
    
    // Assign username and email
    user.email = 'virk@adonisjs.com'
    user.password = 'virk'
    
    // Insert to the database
    await user.save()
    
    console.log(user.$isPersisted) // true
  })
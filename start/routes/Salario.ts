import Route from '@ioc:Adonis/Core/Route'
import ProyeccionSalariosController from 'App/Controllers/Http/ProyeccionSalariosController';

const salarioController = new ProyeccionSalariosController()
Route.group(() => {
Route.post("/proyeccion/salario", salarioController.create);
}).middleware('auth:api')
import Route from '@ioc:Adonis/Core/Route'
import ProyeccionProductosController from 'App/Controllers/Http/ProyeccionProductosController';


const productoController = new ProyeccionProductosController()
Route.post("/proyeccion/producto", productoController.create);
import Route from "@ioc:Adonis/Core/Route"
import ProyeccionActivosController from "App/Controllers/Http/ProyeccionActivosController";

const activoController = new ProyeccionActivosController()
Route.post("/proyeccion/activo", activoController.create);

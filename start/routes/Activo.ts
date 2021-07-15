import Route from "@ioc:Adonis/Core/Route"
import ProyeccionActivosController from "App/Controllers/Http/ProyeccionActivosController";

const activoController = new ProyeccionActivosController()
Route.get("/proyeccion/activo", activoController.index);
Route.post("/proyeccion/activo", activoController.create);
Route.put("/proyeccion/activo", activoController.update);
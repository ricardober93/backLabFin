import Route from "@ioc:Adonis/Core/Route"
import ProyeccionPasivosController from "App/Controllers/Http/ProyeccionPasivosController";

const pasivoController = new ProyeccionPasivosController()
Route.group(() => {
Route.get("/proyeccion/pasivo", pasivoController.index);
Route.post("/proyeccion/pasivo", pasivoController.create);
Route.put("/proyeccion/pasivo/:id", pasivoController.update);
Route.delete("/proyeccion/pasivo/:id", pasivoController.delete);
}).middleware('auth:api')
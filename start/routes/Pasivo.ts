import Route from "@ioc:Adonis/Core/Route"
import ProyeccionPasivosController from "App/Controllers/Http/ProyeccionPasivosController";

const pasivoController = new ProyeccionPasivosController()
Route.get("/proyeccion/pasivo", pasivoController.index);
Route.post("/proyeccion/pasivo", pasivoController.create);
Route.put("/proyeccion/pasivo", pasivoController.update);
import Route from "@ioc:Adonis/Core/Route"
import ProyeccionPasivosController from "App/Controllers/Http/ProyeccionPasivosController";

const pasivoController = new ProyeccionPasivosController()
Route.post("/proyeccion/pasivo", pasivoController.create);

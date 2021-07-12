import Route from "@ioc:Adonis/Core/Route"
import ProyeccionSalariosController from "App/Controllers/Http/ProyeccionSalariosController";

const salarioController = new ProyeccionSalariosController()
Route.post("/proyeccion/salario", salarioController.create);

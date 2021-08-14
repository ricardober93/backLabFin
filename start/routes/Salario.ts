import Route from "@ioc:Adonis/Core/Route";
import ProyeccionSalariosController from "App/Controllers/Http/ProyeccionSalariosController";

const salarioController = new ProyeccionSalariosController();
Route.group(() => {
  Route.get("/proyeccion/salarios", salarioController.index);
  Route.post("/proyeccion/salario", salarioController.create);
  Route.put("/proyeccion/salario/:id", salarioController.update);
  Route.delete("/proyeccion/salario/:id", salarioController.destroy);
}).middleware("auth:api");

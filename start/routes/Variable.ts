import Route from "@ioc:Adonis/Core/Route";
import ProyeccionVariablesController from "App/Controllers/Http/ProyeccionVariablesController";

const Variable = new ProyeccionVariablesController();
Route.group(() => {
  Route.get("/proyeccion/variables", Variable.index);
  Route.post("/proyeccion/variable", Variable.create);
  Route.put("/proyeccion/variable/:id", Variable.update);
  Route.delete("/proyeccion/variable/:id", Variable.destroy);
}).middleware("auth:api");

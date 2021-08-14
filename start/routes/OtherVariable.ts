import Route from "@ioc:Adonis/Core/Route";
import ProyeccionOtherVariablesController from "App/Controllers/Http/ProyeccionOtherVariablesController";

const otherVariable = new ProyeccionOtherVariablesController();
Route.group(() => {
  Route.get("/proyeccion/otherVariables", otherVariable.index);
  Route.post("/proyeccion/otherVariable", otherVariable.create);
  Route.put("/proyeccion/otherVariable/:id", otherVariable.update);
  Route.delete("/proyeccion/otherVariable/:id", otherVariable.destroy);
}).middleware("auth:api");

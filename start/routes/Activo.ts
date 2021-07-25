import Route from "@ioc:Adonis/Core/Route";
import ProyeccionActivosController from "App/Controllers/Http/ProyeccionActivosController";

const activoController = new ProyeccionActivosController();

Route.group(() => {
  Route.get("/proyeccion/activo", activoController.index);
  Route.post("/proyeccion/activo", activoController.create);

  Route.delete("/proyeccion/activo/:id", activoController.delete);
  Route.put("/proyeccion/activo/:id", activoController.update);
}).middleware("auth:api");

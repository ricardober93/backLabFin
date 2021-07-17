import Route from "@ioc:Adonis/Core/Route";
import ProyeccionProductosController from "App/Controllers/Http/ProyeccionProductosController";
const productoController = new ProyeccionProductosController();
Route.get("/proyeccion/productos", productoController.index);
Route.post("/proyeccion/producto", productoController.create);
Route.put("/proyeccion/producto/id", productoController.update);
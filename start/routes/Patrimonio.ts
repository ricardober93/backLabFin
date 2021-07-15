import Route from "@ioc:Adonis/Core/Route"
import PatrimoniosController from "App/Controllers/Http/PatrimoniosController";

const patrimonioController = new PatrimoniosController()
Route.get("/proyeccion/patrimonio", patrimonioController.index);
Route.post("/proyeccion/patrimonio", patrimonioController.create);
Route.put("/proyeccion/patrimonio/:id", patrimonioController.update);
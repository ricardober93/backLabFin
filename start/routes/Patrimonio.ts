import Route from "@ioc:Adonis/Core/Route"
import PatrimoniosController from "App/Controllers/Http/PatrimoniosController";

const patrimonioController = new PatrimoniosController()
Route.get("/proyeccion/pasivo", patrimonioController.index);
Route.post("/proyeccion/pasivo", patrimonioController.create);
Route.put("/proyeccion/pasivo", patrimonioController.update);
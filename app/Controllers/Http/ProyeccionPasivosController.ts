import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Pasivo from "App/Models/Pasivo";
export default class ProyeccionPasivosController {
  public async index({response}: HttpContextContract){
    const pasivos = await Pasivo.all();

    if(pasivos.length < 0){
      response.status(400).json({ message : "No hay pasivos disponibles"})
    } 
    if(pasivos.length > 0){
      response.status(200).json(pasivos)
    } 
  }

  public async create({}: HttpContextContract){
  }

  public async update({ request, response }: HttpContextContract) {
    const id: string = request.params().id;
    const newName: string = request.input("name");
    const newValor: number = request.input("valor");

    const pasivoOld = await Pasivo.findByOrFail("id", id);
    pasivoOld.merge({ name: newName, valor: newValor });

    await pasivoOld.save();
    console.log(pasivoOld.$isPersisted);
    response.status(200).json({ message: "Se actualizo el pasivo" });
  }
}

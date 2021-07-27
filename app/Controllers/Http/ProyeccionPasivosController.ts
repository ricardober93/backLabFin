import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Pasivo from "App/Models/Pasivo";

export default class ProyeccionPasivosController {
  public async index({response}: HttpContextContract){
    const pasivos = await Pasivo.all();

    if(pasivos.length < 0){
      response.status(200).json({ message : "No hay pasivos disponibles"})
    }
    if(pasivos.length > 0){
      response.status(200).json(pasivos)
    }
  }

  public async create({}: HttpContextContract){
  }

  public async update({ request, response }: HttpContextContract) {
    const id: string = request.params().id;
    const newPasivo = request.all()

    const pasivos = await Pasivo.all();
    console.log(newPasivo)
    
    if (pasivos.length < 0) {
      response.status(200).json({ message: "No hay activos disponibles para actualizar" });
    }

    const pasivoOld = await Pasivo.findByOrFail("id", id);
    await pasivoOld
    .merge(newPasivo)
    .save();
    console.log(pasivoOld.$isPersisted);
    response.status(200).json({ message: "Se actualizo el pasivo" });
  }

  public async delete({ request, response }: HttpContextContract) {
    const id: string =  request.params().id;
    const pasivoDel = await Pasivo.findByOrFail("id", id);
    pasivoDel.delete();
    response.status(200).json({ message: "Pasivo eliminado" });
    console.log(pasivoDel);
  }
}

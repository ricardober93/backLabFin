import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Activo from "App/Models/Activo";


export default class ProyeccionPasivosController {
  public async index({ response }: HttpContextContract) {

    const activos = await Activo.all();

    if (activos.length < 0) {
      response.status(200).json({ message: "No hay activos disponibles" });
    }
    if (activos.length > 0) {
      response.status(200).json(activos);
    }
  }

  public async create({}: HttpContextContract) {}

  public async update({ request, response }: HttpContextContract) {
    const id: string = request.params().id;
    const newActivo = request.all()

    const activos = await Activo.all();

    if (activos.length < 0) {
      response.status(200).json({ message: "No hay activos disponibles para actualizar" });
    }
    
    const activoOld = await Activo.findByOrFail("id", id);
    await activoOld
      .merge(newActivo)
      .save();

    console.log(activoOld.$isPersisted);
    response.status(200).json({ message: "Se actualizo el activo" });
  }

  public async delete({ request, response }: HttpContextContract) {
    const id: string =  request.params().id;
    const actiivoDel = await Activo.findByOrFail("id", id);
    actiivoDel.delete();
    response.status(200).json({ message: "Activo eliminado" });
    console.log(actiivoDel);
  }
}

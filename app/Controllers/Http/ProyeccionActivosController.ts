import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Activo from "App/Models/Activo";

const activoModel = new Activo();
export default class ProyeccionActivosController {
  public async index({ response }: HttpContextContract) {
    const activos = await Activo.all();

    if (activos.length < 0) {
      response.status(400).json({ message: "No hay activos disponibles" });
    }
    if (activos.length > 0) {
      response.status(200).json(activos);
    }
  }

  public async create({}: HttpContextContract) {}

  public async update({ request, response }: HttpContextContract) {
    const id: string = request.params().id;
    const newName: string = request.input("name");
    const newValor: number = request.input("valor");

    const activoOld = await Activo.findByOrFail("id", id);
    activoOld.merge({ name: newName, valor: newValor });

    await activoOld.save();
    console.log(activoModel.$isPersisted);
    response.status(200).json({ message: "Se actualizo el activo" });
  }
}

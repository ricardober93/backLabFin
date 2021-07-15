import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Activo from "App/Models/Activo";

const activoModel = new Activo();
export default class ProyeccionActivosController {
  public async index({ response }: HttpContextContract) {
    const activos = await Activo.all();

    if(activos.length < 0){
      response.status(400).json({ message : "No hay activos disponibles"})
    } 
    if(activos.length > 0){
      response.status(200).json(activos)
    } 
  }

  public async create({ request, response }: HttpContextContract) {
    const name: string = request.input("name");
    const valor: number = request.input("valor");

    if (name === null) {
      response.status(400).json({ message: "El nombre no puede ser nulo" });
    }

    if (valor === null) {
      response.status(400).json({ message: "El valor no puede ser nulo" });
    }

    console.log(name, valor);

    activoModel.name = name;
    activoModel.valor = valor;

    await activoModel.save();
    console.log(activoModel.$isPersisted);
    response.status(200).json({ message: "Se creó el activo" });
  }

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

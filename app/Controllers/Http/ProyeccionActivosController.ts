import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Pasivo from "App/Models/Activo";

const activoModel = new Pasivo();
export default class ProyeccionPasivosController {
  public async index({}: HttpContextContract){}

  public async create({ request, response}: HttpContextContract){
    const name: string = request.input("name");
    const valor: number = request.input("valor");

    if(name === null){
      response
      .status(400)
      .json({message: "El nombre no puede ser nulo"})
    }

    if(valor === null){
      response
      .status(400)
      .json({message: "El valor no puede ser nulo"})
    }

    console.log(
      name,
      valor
    );

    activoModel.name = name;
    activoModel.valor = valor;

    await activoModel.save();
    console.log(activoModel.$isPersisted);
    response.status(200).json({message: "Se creó el activo"});
  }
}

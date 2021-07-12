import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Pasivo from "App/Models/Pasivo";

const pasivoModel = new Pasivo();
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

    pasivoModel.name = name;
    pasivoModel.valor = valor;

    await pasivoModel.save();
    console.log(pasivoModel.$isPersisted);
    response.status(200).json({message: "Se creó el pasivo"});
  }
}

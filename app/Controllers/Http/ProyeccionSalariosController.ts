import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Salario from "App/Models/Salario";

const salarioModel = new Salario();
export default class ProyeccionPasivosController {
  public async index({}: HttpContextContract){}

  public async create({ request, response}: HttpContextContract){
    const valor: number = request.input("valor");

    if(valor === null){
      response
      .status(400)
      .json({message: "El valor no puede ser nulo"})
    }

    console.log(
      valor
    );

    salarioModel.valor = valor;

    await salarioModel.save();
    console.log(salarioModel.$isPersisted);
    response.status(200).json({message: "Se creó el salario"});
  }
}

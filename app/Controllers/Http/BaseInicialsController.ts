import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Activo from "App/Models/Activo";
import Pasivo from "App/Models/Pasivo";
import Patrimonio from "App/Models/Patrimonio";
export default class BaseInicialsController {
  public async create({ request, response }: HttpContextContract) {

    const activos = request.input("activos");
    const pasivos= request.input("pasivos");
    const patrimonio = request.input("patrimonio");

    // Varibales para calcular la regla de negocios
    //recorrer cada arreglo para que obtener el total de activos, pasivos, patrimonio.
    const totalActivos: number = activos.reduce(
      (a, b) => a + (b["valueOfActivo"] || 0),
      0
    );
    const totalPasivos: number = pasivos.reduce(
      (a, b) => a + (b["valueOfPasivo"] || 0),
      0
    );
    const totalPatrimonio: number = patrimonio.reduce(
      (a, b) => a + (b["valueOfPatrimonio"] || 0),
      0
    );

    let sum = totalPatrimonio+totalPasivos

    if(totalActivos !== sum ){
      response.status(400).json({message:"La suma de los pasivos y patrimonio no son iguales a los activos"})
      return
    }

    await Activo.createMany(activos)

    await Pasivo.createMany(pasivos)

    await Patrimonio.createMany(patrimonio)

    response.status(200).json({message:"Base inicial creaado"})
  }
}

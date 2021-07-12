import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Activo from "App/Models/Activo";
import Pasivo from "App/Models/Pasivo";
import Patrimonio from "App/Models/Patrimonio";

export interface Iactivos {
  nameOfActivo: string;
  valueOfActivo: number;
}

export interface Ipasivos {
  nameOfPasivo: string;
  valueOfPasivo: number;
}
export interface Ipatrimonio {
  nameOfPatrimonio: string;
  valueOfPatrimonio: number;
}
const activosModel = new Activo()
const pasivosModel = new Pasivo()
const patrimonioModel = new Patrimonio()

export default class BaseInicialsController {
  public async create({ request, response }: HttpContextContract) {
    //  const Activos = [ {nameOfActivo: 'Efectivo', valueOfActivo: 120000}]
    //  const Pasivos = [ {nameOfPasivo: 'Efectivo', valueOfPasivo: 120000}]

    const activos: Iactivos[] = request.input("activos");
    const pasivos: Ipasivos[] = request.input("pasivos");
    const patrimonio: Ipatrimonio[] = request.input("patrimonio");

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

    //guardar en la base de datos cada item de actvi, pasivo y patrimonio no

    activos.forEach( async activo => {
      activosModel.name = activo.nameOfActivo;
      activosModel.valor = activo.valueOfActivo
      await activosModel.save();
    });

    pasivos.forEach( async pasivo => {
      pasivosModel.name = pasivo.nameOfPasivo;
      pasivosModel.valor = pasivo.valueOfPasivo
      await pasivosModel.save();
    });
    

    patrimonio.forEach( async patrimonio => {
      patrimonioModel.name = patrimonio.nameOfPatrimonio;
      patrimonioModel.valor = patrimonio.valueOfPatrimonio
      await patrimonioModel.save()
    });

    response.status(200).json({message:"Base inicial creaado"})
  }
}

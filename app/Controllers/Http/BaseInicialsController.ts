import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

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
export default class BaseInicialsController {
  public async create({ request, response }: HttpContextContract) {
    //  const Activos = [ {nameOfActivo: 'Efectivo', valueOfActivo: 120000}]
    //  const Pasivos = [ {nameOfPasivo: 'Efectivo', valueOfPasivo: 120000}]
    const activos: Iactivos[] = request.input("activos");
    const pasivos: Ipasivos[] = request.input("pasivos");
    const patrimonio: Ipatrimonio[] = request.input("patrimonio");

    console.log(activos, pasivos, patrimonio);

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

    console.log(totalActivos, totalPasivos, totalPatrimonio);

    return { activos, pasivos, patrimonio };
  }
}

import  User  from 'App/Models/user';
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Activo from "App/Models/Activo";
import Pasivo from "App/Models/Pasivo";
import Patrimonio from "App/Models/Patrimonio";

export interface Iactivos {
  name: string;
  valor: number;
}

export interface Ipasivos {
  name: string;
  valor: number;
}
export interface Ipatrimonio {
  name: string;
  valor: number;
}
export default class BaseInicialsController {
  public async create({ auth, request, response }: HttpContextContract) {
    const activos: Iactivos[] = request.input("activos");
    const pasivos: Ipasivos[] = request.input("pasivos");
    const patrimonio: Ipatrimonio[] = request.input("patrimonio");

    const user: User = auth.use("api").user;
    // Varibales para calcular la regla de negocios
    //recorrer cada arreglo para que obtener el total de activos, pasivos, patrimonio.
    const totalActivos: number = activos.reduce(
      (a, b) => a + Number(b["valor"]),
      0
    );
    const totalPasivos: number = pasivos.reduce(
      (a, b) => a + Number(b["valor"]),
      0
    );
    const totalPatrimonio: number = patrimonio.reduce(
      (a, b) => a + Number(b["valor"]),
      0
    );

    let sum = totalPatrimonio + totalPasivos;

    if (totalActivos !== sum) {
      response.status(400).json({
        status: "error",
        message:
          "La suma de los pasivos y patrimonio no son iguales a los activos",
      });
    }


    await (await Activo.createMany(activos)).map( a => a.related('user').associate(user));

    await (await Pasivo.createMany(pasivos)).map(p => p.related('user').associate(user));

    await (await Patrimonio.createMany(patrimonio)).map(p => p.related('user').associate(user));

    response
      .status(200)
      .json({ status: "good", message: "Base inicial creaado" });
  }
}

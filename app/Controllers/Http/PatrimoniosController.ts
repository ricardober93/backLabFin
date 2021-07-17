import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Patrimonio from "App/Models/Patrimonio";

export default class PatrimoniosController {
  public async index({ response }: HttpContextContract) {
    const patrimonio = await Patrimonio.all();

    if (patrimonio.length < 0) {
      response.status(400).json({ message: "No hay patrimonio disponibles" });
    }
    if (patrimonio.length > 0) {
      response.status(200).json(patrimonio);
    }
  }

  public async create({}: HttpContextContract) {}

  public async update({ request, response }: HttpContextContract) {
    const id: string = request.params().id;
    const newName: string = request.input("name");
    const newValor: number = request.input("valor");

    const patrimonioOld = await Patrimonio.findByOrFail("id", id);
    patrimonioOld.merge({ name: newName, valor: newValor });

    await patrimonioOld.save();
    console.log(patrimonioOld.$isPersisted);
    response.status(200).json({ message: "Se actualizo el patrimonio" });
  }

  public async delete({ request, response }: HttpContextContract) {
    const id: string =  request.params().id;
    const patrimonioDel = await Patrimonio.findByOrFail("id", id);
    patrimonioDel.delete();
    response.status(200).json({ message: "Patrimonio eliminado" });
    console.log(patrimonioDel);
  }
}

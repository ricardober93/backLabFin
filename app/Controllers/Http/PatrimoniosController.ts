import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Patrimonio from "App/Models/Patrimonio";
import User from "App/Models/user";
export default class PatrimoniosController {
  public async index({ response, auth }: HttpContextContract) {
    const user = await User.find(auth.use("api")?.user?.id);
    await user?.load("patrimonios");

    const patrimonio = await user?.patrimonios;

    if (patrimonio?.length < 0) {
      response.status(200).json({ message: "No hay patrimonio disponibles" });
    }
    if (patrimonio?.length > 0) {
      response.status(200).json(patrimonio);
    }
  }

  public async create({}: HttpContextContract) {}

  public async update({ request, response }: HttpContextContract) {
    const id: string = request.params().id;
    const newPatrimonio = request.all();

    const patrimonio = await Patrimonio.all();
    if (patrimonio.length < 0) {
      response
        .status(200)
        .json({ message: "No hay activos disponibles para actualizar" });
    }

    const patrimonioOld = await Patrimonio.findByOrFail("id", id);
    patrimonioOld.merge(newPatrimonio);

    await patrimonioOld.save();
    console.log(patrimonioOld.$isPersisted);
    response.status(200).json({ message: "Se actualizo el patrimonio" });
  }

  public async delete({ request, response }: HttpContextContract) {
    const id: string = request.params().id;
    const patrimonioDel = await Patrimonio.findByOrFail("id", id);
    patrimonioDel.delete();
    response.status(200).json({ message: "Patrimonio eliminado" });
    console.log(patrimonioDel);
  }
}

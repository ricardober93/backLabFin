import User from 'App/Models/user';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OtherVariable from 'App/Models/OtherVariable';

export default class ProyeccionOtherVariablesController {
  public async index({ auth, response}: HttpContextContract) {
    const user = await User.find(auth.use("api")?.user?.id);

    await user?.load("otherVariables");
    if (user?.otherVariables === null) {
      response.status(400).json({ message: "no hay otherVariables para mostrar" });
    }
    if (user?.otherVariables !== null) {
      response.status(200).json(user?.otherVariables);
    }
  }

  public async create ({request, response, auth}: HttpContextContract) {
    const user: User = auth?.use("api")?.user;

    const variable = request.all();
    console.log(variable)

    if (variable === null ) {
      response
        .status(400)
        .json({ message: "No se puede crear una varibale vacia" });
        return
    }

    const newVariable = await OtherVariable.create(variable)
    await newVariable.related('user').associate(user)

    response.status(201).json({ message: "Se crearon la variable" });
  }

  public async store ({}: HttpContextContract) {
  }

  public async show ({}: HttpContextContract) {
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update({ request, response}: HttpContextContract) {
    const id: string = request.params().id;
    const updateOtherVariable = request.all()
    const OtherVariableOld = await OtherVariable.findByOrFail("id", id);

    await OtherVariableOld.merge(updateOtherVariable).save();

    response.status(200).json({ message: "Se actualizó las otras variable" });
  }

  public async destroy({ response, request }: HttpContextContract) {
    const id: string = request.params().id;
    const varaibleOld = await OtherVariable.findByOrFail("id", id);
    varaibleOld.delete();
    response.status(200).json({ message: "Otras Variable eliminado" });
  }
}

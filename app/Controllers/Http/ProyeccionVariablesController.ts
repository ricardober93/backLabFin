import User  from 'App/Models/user';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Variable from 'App/Models/Variable';

const variableModel = new Variable();
export default class ProyeccionVariablesController {
  public async index ({response, auth }: HttpContextContract) {
    const user = await User.find(auth.use("api")?.user?.id);

    await user?.load("variables");
    if (user?.variables === null) {
      response.status(400).json({ message: "no hay variables para mostrar" });
    }
    if (user?.variables !== null) {
      response.status(200).json(user?.variables);
    }
  }

  public async create ({request, response, auth }: HttpContextContract) {
    const user: User = auth?.use("api")?.user;

    const variable = request.all();
    console.log(variable)

    if (variable === null ) {
      response
        .status(400)
        .json({ message: "No se puede crear una varibale vacia" });
        return
    }

    variableModel.name = variable.name;
    variableModel.value = variable.value;
    await variableModel.save()
    await variableModel.related('user').associate(user)

    response.status(201).json({ message: "Se crearon la variable" });
  }

  public async store ({}: HttpContextContract) {
  }

  public async show ({}: HttpContextContract) {
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}

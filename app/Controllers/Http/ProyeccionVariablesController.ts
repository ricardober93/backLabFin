import User  from 'App/Models/user';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Variable from 'App/Models/Variable';

export default class ProyeccionVariablesController {
  public async index ({}: HttpContextContract) {
  }

  public async create ({request, response, auth }: HttpContextContract) {
    const user: User = auth?.use("api")?.user;

    const variable = request.all();

    if (variable === null ) {
      response
        .status(400)
        .json({ message: "No se puede crear una varibale vacia" });
        return
    }

    const newVariable = await Variable.create(variable);
    await newVariable.related('user').associate(user)

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

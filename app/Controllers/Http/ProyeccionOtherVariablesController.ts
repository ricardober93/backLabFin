import User from 'App/Models/user';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OtherVariable from 'App/Models/OtherVariable';

export default class ProyeccionOtherVariablesController {
  public async index ({}: HttpContextContract) {
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

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}

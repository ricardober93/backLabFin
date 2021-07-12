import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { afterFind } from "@ioc:Adonis/Lucid/Orm";
import User from "App/Models/user";
const user = new User();
export default class AuthController {
  public async index({}: HttpContextContract) {}

  public async create({ request, response }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");

    // Assign username and email
    user.email = email;
    user.password = password;

    // Insert to the database
    await user.save();
    console.log(user.$isPersisted); // true
    response.status(200).json({ email: email, password: password });
    console.log("Usuario creado")

  }

  public async login({ auth, request }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");

    return await auth.use("api").attempt(email, password);
  }
}

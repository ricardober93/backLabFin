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

    const usuarioRepetido = await User.findBy('email', `${user.email}`)

    if(usuarioRepetido?.$attributes.email === user.email){
      response.status(400).json({ message: "Usuario repetido"});
      return
    }
      await user.save();
      response.status(200).json({ message: "Usuario creado satisfactoriamente."});

    // Insert to the database

    console.log(user.$isPersisted); // true
    console.log(usuarioRepetido);


  }

  public async login({ auth, request }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");

    return await auth.use("api").attempt(email, password);
  }

  public async show ({}: HttpContextContract) {
    const mostrarUsusario = await User.all()
    
  }
}

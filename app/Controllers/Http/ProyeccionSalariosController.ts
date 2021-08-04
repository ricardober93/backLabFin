import  User from 'App/Models/user';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Salario from 'App/Models/Salario';


const salarioModel =  new Salario();
export default class ProyeccionSalariosController {
  public async index ({ response , auth}: HttpContextContract) {
    const user = await User.find(auth.use("api")?.user?.id);

    await user?.load("salarios");
    if (user?.salarios === null) {
      response.status(400).json({ message: "no hay salarios para mostrar" });
    }
    if (user?.salarios !== null) {
      response.status(200).json(user?.salarios);
    }
  }

  public async create ({request, response, auth}: HttpContextContract) {
    const user: User = auth.use("api")?.user;

    const name = request?.input("name");
    const salary = request?.input("salary")
    const dayWorks = request?.input("daysWorks")
    const pension = request?.input("pension")
    const salud = request?.input("salud")
    const transport = request?.input("transport")
    const comision = request?.input("comision")

    console.log(transport, comision,)

    if (name === null || salary === null) {
      response
        .status(400)
        .json({ message: "El nombre no puede ser un valor vacio" });
    }

    salarioModel.name =name;
    salarioModel.salary = salary;
    salarioModel.day_works = dayWorks;
    salarioModel.pension = pension;
    salarioModel.salud = salud;

    if (transport) {
      salarioModel.transport = salary * 0.1 
    }else{
      salarioModel.transport = 0
    }

    if (comision) {
      salarioModel.comision = salary * 0.3 
    }else{
      salarioModel.comision = 0
    }
    
    const newSalary = await salarioModel.save()
    await newSalary.related('user').associate(user)


    response.status(201).json({ message: "Salario creado con exito", newSalary })
  }



  public async destroy({ request, response }: HttpContextContract) {
    const id: string =  request.params().id;
    const salarioDel = await Salario.findByOrFail("id", id);
    salarioDel.delete();
    response.status(200).json({ message: "Salario eliminado" });
  }

}

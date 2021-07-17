import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Salario from 'App/Models/Salario';


const salarioModel =  new Salario();
export default class ProyeccionSalariosController {
  public async index ({ response }: HttpContextContract) {
    const salarios = await Salario.all();
    if (salarios.length < 0) {
      response.status(400).json({ message: "no hay salarios para mostrar" });
    }
    if (salarios.length > 0) {
      response.status(200).json(salarios);
    }
  }

  public async create ({request, response}: HttpContextContract) {

    const name = request.input("name");
    const salary = request.input("salary")
    const dayWorks = request.input("dayWorks")
    const pension = request.input("pension")
    const salud = request.input("salud")
    const transport = request.input("transport")
    const comision = request.input("comision")

    salarioModel.name =name;
    salarioModel.salary = salary;
    salarioModel.dayWorks = dayWorks;
    salarioModel.pension = pension;
    salarioModel.salud = salud;

    transport === true ? salarioModel.transport = salary * 0.5 : 0;
    comision === true ? salarioModel.comision = salary * 0.3 : 0;
    await salarioModel.save()

    console.log(salarioModel)
    response.status(200).json({ message: salarioModel.$isPersisted })
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id: string =  request.params().id;
    const salarioDel = await Salario.findByOrFail("id", id);
    salarioDel.delete();
    response.status(200).json({ message: "Salario eliminado" });
    console.log(salarioDel);
  }

}

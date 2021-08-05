import User from "App/Models/user";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Salario from "App/Models/Salario";

const salarioModel = new Salario();
export default class ProyeccionSalariosController {
  public async index({ response, auth }: HttpContextContract) {
    const user = await User.find(auth.use("api")?.user?.id);

    await user?.load("salarios");
    if (user?.salarios === null) {
      response.status(400).json({ message: "no hay salarios para mostrar" });
    }
    if (user?.salarios !== null) {
      response.status(200).json(user?.salarios);
    }
  }

  public async create({ request, response, auth }: HttpContextContract) {
    const user: User = auth?.use("api")?.user;

    const name = request?.input("name");
    const salary = request?.input("salary");
    const dayWorks = request?.input("daysWorks");
    const pension = request?.input("pension");
    const salud = request?.input("salud");
    const transport = request?.input("transport");
    const comision = request?.input("comision");

    console.log(transport, comision);

    if (name === null || salary === null) {
      response
        .status(400)
        .json({ message: "El nombre no puede ser un valor vacio" });
    }

    salarioModel.name = name;
    salarioModel.salary = salary;
    salarioModel.day_works = dayWorks;
    salarioModel.pension = pension;
    salarioModel.salud = salud;

    if (transport) {
      salarioModel.transport = salary * 0.1;
    } else {
      salarioModel.transport = 0;
    }

    if (comision) {
      salarioModel.comision = salary * 0.3;
    } else {
      salarioModel.comision = 0;
    }

    const newSalary = await salarioModel.save();
    await newSalary.related("user").associate(user);

    response.status(201).json({ message: "Salario creado con exito" });
  }

  public async update({ request, response }: HttpContextContract) {
    const id: string = request.params().id;

    const salarioOld = await Salario.findByOrFail("id", id);

    const name = request?.input("name");
    const salary = request?.input("salary");
    const dayWorks = request?.input("dayWorks");
    const pension = request?.input("pension");
    const salud = request?.input("salud");
    const transport = request?.input("transport");
    const comision = request?.input("comision");

    if (name === null || salary === null) {
      response
        .status(400)
        .json({ message: "El nombre no puede ser un valor vacio" });
    }

    const NewName = name ? name : salarioOld.name;
    const newSalary = salary ? salary : salarioOld.salary;
    const newDayWorks = dayWorks ? dayWorks : salarioOld.day_works;
    const newPension = pension ? pension : salarioOld.pension;
    const newSalud = salud ? salud : salarioOld.salud;

    let newTransport: number = 0;
    let newComision: number = 0;
    if (transport) {
      newTransport = salarioOld.salary * 0.1;
    }
    if (comision) {
      newComision = salarioOld.salary * 0.3;
    }
   await salarioOld
      .merge({
        name: NewName,
        salary: newSalary,
        day_works: newDayWorks,
        pension: newPension,
        salud: newSalud,
        transport: newTransport,
        comision: newComision,
      })
      .save();
    response.status(200).json({ message: "Salario actualizado con exito" });
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id: string = request.params().id;
    const salarioDel = await Salario.findByOrFail("id", id);
    salarioDel.delete();
    response.status(200).json({ message: "Salario eliminado" });
  }
}

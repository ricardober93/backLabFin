import User from 'App/Models/user';
import Producto from 'App/Models/Producto';
import PresupuestoVenta from "App/Models/PresupuestoVenta";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ProyeccionPresupuestoVentasController {
  public async index({ auth,response }: HttpContextContract) {
    const producto = await Producto.find(auth.use("api")?.user?.id);
  }
}

import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Producto from "App/Models/Producto";

const productoModel = new Producto();
export default class ProyeccionProductosController {
  public async index({}: HttpContextContract) {}

  public async create({ request, response }: HttpContextContract) {
    const name: string = request.input("name");
    const quantity: number = request.input("quantity");
    const priceOnSale: number = request.input("priceOnSale");
    const rateCost: number = request.input("rateCost");
    const rateRaise: number = request.input("rateRaise");
    const rateOfSale: number = request.input("rateOfSale");
    const rateOfPurchases: number = request.input("rateOfPurchases");

    if (name === null || quantity === null) {
      response
        .status(400)
        .json({ message: "El nombre no puede ser un valor nulo" });
    }

    console.log(
      name,
      quantity,
      priceOnSale,
      rateCost,
      rateRaise,
      rateOfSale,
      rateOfPurchases
    );

    productoModel.name = name;
    productoModel.quantity = quantity;
    productoModel.price = priceOnSale;
    productoModel.rateCost = rateCost;
    productoModel.rateRaise = rateRaise;
    productoModel.rateOfSale = rateOfSale;
    productoModel.rateOfPurchases = rateOfPurchases;

    await productoModel.save();
    console.log(productoModel.$isPersisted);
    response.status(200).json({ message: "Se crearon el producto" });
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}

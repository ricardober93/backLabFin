import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Producto from "App/Models/Producto";

const productoModel = new Producto();
export default class ProyeccionProductosController {
  public async index({ response }: HttpContextContract) {
    const products = await Producto.all();
    if (products.length < 0) {
      response.status(400).json({ message: "no hay productos para mostrar" });
    }
    if (products.length > 0) {
      response.status(200).json(products);
    }
  }

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

  public async update({ request, response }: HttpContextContract) {
    const id: string = request.params().id;
    const newName: string = request.input("name");
    const newQuantity: number = request.input("quantity");
    const newPriceOnSale: number = request.input("priceOnSale");
    const newRateCost: number = request.input("rateCost");
    const newRateRaise: number = request.input("rateRaise");
    const newRateOfSale: number = request.input("rateOfSale");
    const newRateOfPurchases: number = request.input("rateOfPurchases");

    const productoOLd = await Producto.findByOrFail("id", id);
    productoOLd.merge({
      name: newName,
      quantity: newQuantity,
      price: newPriceOnSale,
      rateCost: newRateCost,
      rateRaise: newRateRaise,
      rateOfSale: newRateOfSale,
      rateOfPurchases: newRateOfPurchases,
    });

    await productoOLd.save();
    console.log(productoOLd.$isPersisted);
    response.status(200).json({ message: "Se actualizó el producto" });
  }

  public async destroy({}: HttpContextContract) {}
}

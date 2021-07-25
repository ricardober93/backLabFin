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
    const product = request.all();

    if (product.name === null || product.quantity === null) {
      response
        .status(204)
        .json({ message: "El nombre no puede ser un valor nulo" });
    }

    const newProduct = await Producto.create(product);
    await newProduct.save();
    console.log(newProduct.$isPersisted);
    response.status(201).json({ message: "Se crearon el producto" });
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({ request, response }: HttpContextContract) {
    const id: string = request.params().id;
    const productAll = request.all();

    const productoOLd = await Producto.findByOrFail("id", id);

    console.log(id, productAll, productAll);
    if (productoOLd === null) {
      response.status(203).json({ message: "no hay producto" });
      return;
    }

    await productoOLd.merge(productAll).save();
    console.log(productoOLd.$isPersisted);
    response.status(200).json({ message: "Se actualizó el producto" });
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id: string = request.params().id;
    const productoDel = await Producto.findByOrFail("id", id);
    productoDel.delete();
    response.status(200).json({ message: "Producto eliminado" });
    console.log(productoDel);
  }
}

import User from 'App/Models/user';
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Producto from "App/Models/Producto";

export default class ProyeccionProductosController {
  public async index({ auth, response }: HttpContextContract) {
    const user = await User.find(auth.use("api")?.user?.id);


    await user?.load('productos');
    if (user?.productos === null) {
      response.status(400).json({ message: "no hay productos para mostrar" });
    }
    if (user?.productos !== null) {
      response.status(200).json(user?.productos);
    }
  }

  public async create({ auth, request, response }: HttpContextContract) {
    const product = request.all();
    console.log(product)
    const user: User = auth?.use("api")?.user;

    if (product.name === null || product.quantity === null) {
      response
        .status(204)
        .json({ message: "El nombre no puede ser un valor nulo" });
    }

    const newProduct = await Producto.create(product);
    await newProduct.related('user').associate(user)

    response.status(201).json({ message: "Se crearon el producto" });
  }

  public async store({ }: HttpContextContract) { }

  public async show({ }: HttpContextContract) { }

  public async edit({ }: HttpContextContract) { }

  public async update({ request, response }: HttpContextContract) {
    const id: string = request.params().id;
    const productAll = request.all();

    const productoOLd = await Producto.findByOrFail("id", id);

    if (productoOLd === null) {
      response.status(203).json({ message: "no hay producto" });
      return;
    }

    await productoOLd.merge(productAll).save();

    response.status(200).json({ message: "Se actualizó el producto" });
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id: string = request.params().id;
    const productoDel = await Producto.findByOrFail("id", id);
    productoDel.delete();
    response.status(200).json({ message: "Producto eliminado" });
    console.log(productoDel);
  }


  public async proyeccionProductos({ auth, response }: HttpContextContract) {
    const user = await User.find(auth.use("api")?.user?.id);

    await user?.load('productos');

    const proyeccion = user?.productos?.map(p => {
      const periodo_uno = p.quantity * p.price;
      const periodo_dos = periodo_uno * (1 + p.rate_raise/100 );
      const periodo_tres = periodo_dos * (1 + p.rate_raise/100);
      const periodo_cuatro = periodo_tres * (1 + p.rate_raise/100);
      const periodo_quinto = periodo_cuatro * (1 + p.rate_raise/100);
      return {
        name: p.name,
        periodo_uno,
        periodo_dos,
        periodo_tres,
        periodo_cuatro,
        periodo_quinto
      }
    }

    )

    response.status(200).json(proyeccion);
  }
}

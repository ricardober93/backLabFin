import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
export default class BaseInicialsController {
    
  public async index(ctx: HttpContextContract) {

  
    return 'Hello world'
  }
}

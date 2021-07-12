import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Producto extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public quantity: number;

  @column()
  public price: number;

  @column()
  public rateCost: number;

  @column()
  public rateRaise: number;

  @column()
  public rateOfSale: number;
   
  @column()
  public rateOfPurchases: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}

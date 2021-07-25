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
  public rate_cost: number;

  @column()
  public rate_raise: number;

  @column()
  public rate_of_sale: number;
   
  @column()
  public rate_of_purchases: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}

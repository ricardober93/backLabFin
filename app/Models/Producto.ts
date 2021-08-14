import User from 'App/Models/user';
import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";

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
  public rate_raise: number;

  @column()
  public price_cost: number;

  @column()
  public inventary_final: number;

  @column()
  public rate_of_sale: number;
   
  @column()
  public rate_of_purchases: number;

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}

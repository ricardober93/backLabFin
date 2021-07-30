import User from 'App/Models/user';
import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

export default class Salario extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public name: string;

  @column()
  public salary: number;

  @column()
  public dayWorks: number;

  @column()
  public pension: number;

  @column()
  public salud: number;

  @column()
  public transport: number;

  @column()
  public comision: number;

  @column()
  public valor: number
  
  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

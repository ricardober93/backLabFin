import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

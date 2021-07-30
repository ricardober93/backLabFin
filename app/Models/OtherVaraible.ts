import User from 'App/Models/user';
import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

export default class OtherVaraible extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public otros_ingresos: number

  @column()
  public otros_egresos: number

  @column()
  public valor_prestamo: number

  @column()
  public valor_cdt: number

  @column()
  public salary_min: number

  @column()
  public increment_salary: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

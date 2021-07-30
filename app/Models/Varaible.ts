import User  from 'App/Models/user';
import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

export default class Varaible extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public impuesto_renta: number

  @column()
  public reserva_legal: number

  @column()
  public tasa_oportuna: number

  @column()
  public tasa_prestamo: number

  @column()
  public salud: number

  @column()
  public pension: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

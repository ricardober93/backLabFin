import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'

import Activo from 'App/Models/Activo';
import Pasivo from './Pasivo';
import Patrimonio from './Patrimonio';
import Producto from './Producto';
import Salario from './Salario';
export default class user extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public rememberMeToken?: string;

  @column()
  public isActive: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Activo)
  public activos: HasMany<typeof Activo>;

  @hasMany(() => Pasivo)
  public pasivos: HasMany<typeof Pasivo>;

  @hasMany(() => Patrimonio)
  public patrimonios: HasMany<typeof Patrimonio>;

  @hasMany(() => Producto)
  public productos: HasMany<typeof Producto>;

  @hasMany(() => Salario)
  public salarios: HasMany<typeof Salario>;

  @beforeSave()
  public static async hashPassword (user: user) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}

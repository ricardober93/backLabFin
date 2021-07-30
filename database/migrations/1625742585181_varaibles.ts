import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Varaibles extends BaseSchema {
  protected tableName = 'varaibles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('impuesto_renta')
      table.integer('reserva_legal')
      table.integer('tasa_oportuna')
      table.integer('tasa_prestamo')
      table.integer('salud')
      table.integer('pension')
      table
        .integer('user_id')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE') // delete profile when user is deleted
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

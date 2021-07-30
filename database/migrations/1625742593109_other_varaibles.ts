import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class OtherVaraibles extends BaseSchema {
  protected tableName = 'other_varaibles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer("otros_ingresos")
      table.integer("otros_egresos")
      table.integer("valor_prestamo")
      table.integer("valor_cdt")
      table.integer("salary_min")
      table.integer("increment_salary")
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

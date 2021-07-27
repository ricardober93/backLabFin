import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Salarios extends BaseSchema {
  protected tableName = 'salarios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('valor', 50).notNullable()

      table.string('name').notNullable()
      table.integer('salary')
      table.integer('day_works')
      table.integer('pension')
      table.integer('salud')
      table.integer('transport').nullable()
      table.integer('comision').nullable()
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

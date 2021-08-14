import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Productos extends BaseSchema {
  protected tableName = 'productos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable()
      table.integer('quantity').notNullable()
      table.integer('price').nullable()
      table.integer('rate_raise')
      table.integer('rate_cost')
      table.integer('inventary_final')
      table.integer('rate_of_sale')
      table.integer('rate_of_purchases')
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

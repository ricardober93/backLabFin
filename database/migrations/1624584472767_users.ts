import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email', 255).notNullable()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
<<<<<<< HEAD
      table.integer('id_producto').unsigned().references('id').inTable('productos').onDelete('CASCADE')
      table.integer('id_presupuesto_venta').unsigned().references('id').inTable('presupuesto_ventas').onDelete('CASCADE')

=======
      table.string('is_active').defaultTo('inactive').nullable()
>>>>>>> d6e54528ff9eecbb292ba04b5243a0d8b3cf336e
      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

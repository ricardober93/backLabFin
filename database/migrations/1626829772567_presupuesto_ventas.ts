import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PresupuestoVentas extends BaseSchema {
  protected tableName = 'presupuesto_ventas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre', 255).notNullable()
      table.integer('periodo1').notNullable()
      table.integer('periodo2').notNullable()
      table.integer('periodo3').notNullable()
      table.integer('periodo4').notNullable()
      table.integer('periodo5').notNullable()
      table.integer('id_productos').unsigned().references('id').inTable('productos').onDelete('CASCADE')

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

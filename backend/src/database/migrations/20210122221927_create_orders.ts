import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('orders', table => {
    table.increments();
    table.integer('route_id');
    table.string('client').notNullable();
    table.string('payment').notNullable().defaultTo('pendente');
    table.decimal('value_to_receive');
    table.boolean('delivered').notNullable().defaultTo(false);

    table.foreign('route_id').references('id').inTable('routes');
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('orders');
}


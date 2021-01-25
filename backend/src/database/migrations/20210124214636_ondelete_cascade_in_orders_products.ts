import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('orders_products', table => {
    table.dropForeign(['order_id']);

    table.foreign('order_id').references('id').inTable('orders').onDelete('CASCADE');
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('orders_products', table => {
    table.dropForeign(['order_id']);

    table.foreign('order_id').references('id').inTable('orders')
  })
}


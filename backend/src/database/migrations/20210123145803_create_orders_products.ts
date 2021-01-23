import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('orders_products', table => {
    table.increments();
    table.integer('order_id').notNullable();
    table.integer('product_id').notNullable();
    table.integer('product_amount').notNullable().unsigned();

    table.foreign('order_id').references('id').inTable('orders');
    table.foreign('product_id').references('id').inTable('products');
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('orders_products');
}


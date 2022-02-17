import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('products', table => {
    table.increments();
    table.integer('category_id').notNullable().unsigned();
    table.string('name').notNullable();
    table.boolean('active').notNullable().defaultTo(true);

    table.foreign('category_id').references('id').inTable('categories');
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('products');
}


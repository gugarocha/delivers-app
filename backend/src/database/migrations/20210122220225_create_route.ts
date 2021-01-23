import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('routes', table => {
    table.increments();
    table.string('name').notNullable();
    table.date('date').notNullable();
    table.boolean('finished').notNullable().defaultTo(false);
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('routes');
}


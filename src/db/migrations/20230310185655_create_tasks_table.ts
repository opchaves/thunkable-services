import { Knex } from 'knex';
import Table from '../../constants/table';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(Table.TASKS, (table) => {
    table.increments('id').primary();
    table.integer('estimated_time').notNullable();
    table.integer('user_id').notNullable();

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(Table.TASKS);
}

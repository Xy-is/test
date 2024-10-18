import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1729017667113 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL,
      user_id INT,
      status VARCHAR(20) NOT NULL DEFAULT 'pending',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT tasks_users_fk
          FOREIGN KEY (user_id) REFERENCES clients(id) ON DELETE CASCADE
    );`);

    // Create the trigger function for automatically updating the updated_at column
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION update_task_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ LANGUAGE 'plpgsql';
    `);

    // Attach the trigger to the tasks table
    await queryRunner.query(`
      CREATE TRIGGER update_task_updated_at
      BEFORE UPDATE ON tasks
      FOR EACH ROW
      EXECUTE FUNCTION update_task_updated_at_column();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS update_task_updated_at ON tasks`,
    );
    await queryRunner.query(
      `DROP FUNCTION IF EXISTS update_task_updated_at_column`,
    );
    await queryRunner.query(`DROP TABLE tasks`);
  }
}

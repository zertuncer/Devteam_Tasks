export class Init1725540000000 {
    name = 'Init1725540000000'

    async up(queryRunner) {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS users (
            id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
            username VARCHAR(255) NOT NULL UNIQUE,
            email VARCHAR(255) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS todos (
            id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            completed BOOLEAN NOT NULL DEFAULT false,
            user_id uuid REFERENCES users(id) ON DELETE CASCADE,
            created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )`);

        await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_todos_completed ON todos(completed)`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_todos_created_at ON todos(created_at)`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX IF EXISTS idx_todos_created_at`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_todos_completed`);
        await queryRunner.query(`DROP TABLE IF EXISTS todos`);
        await queryRunner.query(`DROP TABLE IF EXISTS users`);
    }
}



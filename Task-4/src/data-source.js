import 'reflect-metadata';
import { DataSource } from 'typeorm';

// NeonDB bağlantı dizesini buraya yapıştır (örn. postgresql://...neon.tech/db?sslmode=require)
// Boş bırakılırsa yerel PostgreSQL ayarları (localhost) kullanılır
const NEON_DATABASE_URL = 'postgresql://neondb_owner:npg_7feU2YmkyKPX@ep-spring-dream-a255q04t-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const common = {
    type: 'postgres',
    synchronize: false,
    logging: false,
    entities: [
        'src/entities/*.js',
    ],
    migrations: [
        'src/migrations/*.js',
    ],
};

const options = NEON_DATABASE_URL
    ? {
        ...common,
        url: NEON_DATABASE_URL,
        // Neon için SSL gereklidir
        ssl: { rejectUnauthorized: false },
    }
    : {
        ...common,
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'todo_db',
    };

export const AppDataSource = new DataSource(options);

export async function initDataSource() {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    return AppDataSource;
}



import { EntitySchema } from 'typeorm';

export const UserEntity = new EntitySchema({
    name: 'User',
    tableName: 'users',
    columns: {
        id: {
            type: 'uuid',
            primary: true,
            generated: 'uuid',
        },
        username: {
            type: 'varchar',
            unique: true,
        },
        email: {
            type: 'varchar',
            unique: true,
        },
        password_hash: {
            type: 'varchar',
        },
        created_at: {
            type: 'timestamptz',
            createDate: true,
            default: () => 'CURRENT_TIMESTAMP',
        },
    },
    relations: {
        todos: {
            type: 'one-to-many',
            target: 'Todo',
            inverseSide: 'user',
        },
    },
});

export default UserEntity;



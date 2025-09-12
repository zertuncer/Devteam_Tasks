import { EntitySchema } from 'typeorm';

export const TodoEntity = new EntitySchema({
    name: 'Todo',
    tableName: 'todos',
    columns: {
        id: {
            type: 'uuid',
            primary: true,
            generated: 'uuid',
        },
        title: {
            type: 'varchar',
        },
        description: {
            type: 'text',
        },
        completed: {
            type: 'boolean',
            default: false,
            index: true,
        },
        created_at: {
            type: 'timestamptz',
            createDate: true,
            default: () => 'CURRENT_TIMESTAMP',
            index: true,
        },
        updated_at: {
            type: 'timestamptz',
            updateDate: true,
            default: () => 'CURRENT_TIMESTAMP',
        },
    },
    relations: {
        user: {
            type: 'many-to-one',
            target: 'User',
            joinColumn: { name: 'user_id' },
            onDelete: 'CASCADE',
        },
    },
});

export default TodoEntity;



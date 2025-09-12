import { EntitySchema } from 'typeorm';

export const ElevatedTokenEntity = new EntitySchema({
    name: 'ElevatedToken',
    tableName: 'elevated_tokens',
    columns: {
        id: {
            type: 'uuid',
            primary: true,
            generated: 'uuid',
        },
        token: {
            type: 'varchar',
            unique: true,
        },
        userId: {
            type: 'uuid',
        },
        action: {
            type: 'varchar',
        },
        expiresAt: {
            type: 'timestamptz',
        },
        used: {
            type: 'boolean',
            default: false,
        },
        created_at: {
            type: 'timestamptz',
            createDate: true,
            default: () => 'CURRENT_TIMESTAMP',
        },
    },
    relations: {
        user: {
            type: 'many-to-one',
            target: 'User',
            joinColumn: { name: 'userId' },
            onDelete: 'CASCADE',
        },
    },
});

export default ElevatedTokenEntity;

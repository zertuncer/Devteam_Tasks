import { Table } from "typeorm";

export class AddElevatedTokens1725540000001 {
    name = 'AddElevatedTokens1725540000001'

    async up(queryRunner) {
        await queryRunner.createTable(
            new Table({
                name: "elevated_tokens",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()"
                    },
                    {
                        name: "token",
                        type: "varchar",
                        isUnique: true
                    },
                    {
                        name: "userId",
                        type: "uuid"
                    },
                    {
                        name: "action",
                        type: "varchar"
                    },
                    {
                        name: "expiresAt",
                        type: "timestamptz"
                    },
                    {
                        name: "used",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "created_at",
                        type: "timestamptz",
                        default: "CURRENT_TIMESTAMP"
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ["userId"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE"
                    }
                ]
            }),
            true
        );
    }

    async down(queryRunner) {
        await queryRunner.dropTable("elevated_tokens");
    }
}

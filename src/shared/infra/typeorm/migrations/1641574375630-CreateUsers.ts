import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateUsers1641574375630 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar'
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isUnique: false,
                    },
                    {
                        name: 'password',
                        type: 'varchar'
                    },
                    {
                        //para saber quando o usuário realizou o cadastro.
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        //para saber quando o usuário fez a última alteração em seu cadastro.
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}

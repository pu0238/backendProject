import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserRank1639693198812 implements MigrationInterface {
    name = 'AddUserRank1639693198812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO \`rank\` (\`rank\`, \`permissionsLvl\`) VALUES (\"user\", 2) `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM \`rank\` WHERE \`rank\` = \`user\` `);
    }

}

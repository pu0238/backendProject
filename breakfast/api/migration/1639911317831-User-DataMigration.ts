import {MigrationInterface, QueryRunner} from "typeorm";

export class UserDataMigration1639911317831 implements MigrationInterface {
    name = 'UserDataMigration1639911317831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_8cf09661f91bf2c488592fa02d\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`personal_data\` CHANGE \`name\` \`firstName\` varchar(30) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`personal_data\` CHANGE \`firstName\` \`name\` varchar(30) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_8cf09661f91bf2c488592fa02d\` ON \`user\` (\`personalDataId\`)`);
    }

}

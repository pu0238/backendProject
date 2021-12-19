import {MigrationInterface, QueryRunner} from "typeorm";

export class UserDataOneToOneMigrate1639910011577 implements MigrationInterface {
    name = 'UserDataOneToOneMigrate1639910011577'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_8cf09661f91bf2c488592fa02d7\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_8cf09661f91bf2c488592fa02d\` (\`personalDataId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_8cf09661f91bf2c488592fa02d\` ON \`user\` (\`personalDataId\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_8cf09661f91bf2c488592fa02d7\` FOREIGN KEY (\`personalDataId\`) REFERENCES \`personal_data\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_8cf09661f91bf2c488592fa02d7\``);
        await queryRunner.query(`DROP INDEX \`REL_8cf09661f91bf2c488592fa02d\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_8cf09661f91bf2c488592fa02d\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_8cf09661f91bf2c488592fa02d7\` FOREIGN KEY (\`personalDataId\`) REFERENCES \`personal_data\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

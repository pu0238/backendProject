import {MigrationInterface, QueryRunner} from "typeorm";

export class UserdataIDMigration1639909443646 implements MigrationInterface {
    name = 'UserdataIDMigration1639909443646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_8cf09661f91bf2c488592fa02d7\``);
        await queryRunner.query(`ALTER TABLE \`personal_data\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`personal_data\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`personal_data\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`personal_data\` ADD \`id\` char(36) NOT NULL PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`personalDataId\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`personalDataId\` char(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_8cf09661f91bf2c488592fa02d7\` FOREIGN KEY (\`personalDataId\`) REFERENCES \`personal_data\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_8cf09661f91bf2c488592fa02d7\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`personalDataId\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`personalDataId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`personal_data\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`personal_data\` ADD \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`personal_data\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`personal_data\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_8cf09661f91bf2c488592fa02d7\` FOREIGN KEY (\`personalDataId\`) REFERENCES \`personal_data\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

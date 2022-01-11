import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveCascadeFromUserData1641926566459 implements MigrationInterface {
    name = 'RemoveCascadeFromUserData1641926566459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_8cf09661f91bf2c488592fa02d7\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_8cf09661f91bf2c488592fa02d7\` FOREIGN KEY (\`personalDataId\`) REFERENCES \`personal_data\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_8cf09661f91bf2c488592fa02d7\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_8cf09661f91bf2c488592fa02d7\` FOREIGN KEY (\`personalDataId\`) REFERENCES \`personal_data\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}

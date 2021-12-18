import {MigrationInterface, QueryRunner} from "typeorm";

export class PersonalData1639779150004 implements MigrationInterface {
    name = 'PersonalData1639779150004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`personal_data\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(30) NOT NULL, \`lastLame\` varchar(30) NOT NULL, \`phone\` varchar(50) NOT NULL, \`birthDate\` datetime NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`personalDataId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_8cf09661f91bf2c488592fa02d7\` FOREIGN KEY (\`personalDataId\`) REFERENCES \`personal_data\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_8cf09661f91bf2c488592fa02d7\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`personalDataId\``);
        await queryRunner.query(`DROP TABLE \`personal_data\``);
    }

}

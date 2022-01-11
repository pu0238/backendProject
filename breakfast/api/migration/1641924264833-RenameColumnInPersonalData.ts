import {MigrationInterface, QueryRunner} from "typeorm";

export class RenameColumnInPersonalData1641924264833 implements MigrationInterface {
    name = 'RenameColumnInPersonalData1641924264833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`personal_data\` CHANGE \`lastLame\` \`lastName\` varchar(30) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`personal_data\` CHANGE \`lastName\` \`lastLame\` varchar(30) NOT NULL`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedStoryTable1702063620950 implements MigrationInterface {
    name = 'UpdatedStoryTable1702063620950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Story" ADD "fullText" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Story" DROP COLUMN "fullText"`);
    }

}

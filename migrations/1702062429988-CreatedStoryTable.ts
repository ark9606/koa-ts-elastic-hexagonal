import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedStoryTable1702062429988 implements MigrationInterface {
    name = 'CreatedStoryTable1702062429988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Story" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "photoUrl" character varying NOT NULL, "authorId" character varying NOT NULL, "category" character varying NOT NULL, "liked" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_92822e4942a5e4eee63c1ccbb4d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Author" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Author" DROP COLUMN "createdAt"`);
        await queryRunner.query(`DROP TABLE "Story"`);
    }

}

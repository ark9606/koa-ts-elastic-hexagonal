import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAuthorTable1702047653994 implements MigrationInterface {
    name = 'CreateAuthorTable1702047653994'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Author" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "description" character varying NOT NULL, "photoUrl" character varying NOT NULL, CONSTRAINT "PK_23e89f84c8240e5adee0bcb8edb" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Author"`);
    }

}

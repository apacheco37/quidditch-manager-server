import { MigrationInterface, QueryRunner } from "typeorm";

export class addGenderToPlayer1636238895140 implements MigrationInterface {
    name = 'addGenderToPlayer1636238895140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "player_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(
            `ALTER TABLE "player" ADD "gender" "player_gender_enum" NOT NULL DEFAULT 'male'`
        );
        await queryRunner.query(
            `ALTER TABLE "player" ALTER COLUMN "gender" DROP DEFAULT`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "gender"`);
        await queryRunner.query(`DROP TYPE "player_gender_enum"`);
    }

}
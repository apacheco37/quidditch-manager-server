import {MigrationInterface, QueryRunner} from "typeorm";

export class fixKeeperMatchOrderRelation1636928981019 implements MigrationInterface {
    name = 'fixKeeperMatchOrderRelation1636928981019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match_order" DROP CONSTRAINT "FK_d1ac459878bdfb0fdf565192318"`);
        await queryRunner.query(`COMMENT ON COLUMN "match_order"."keeperId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "match_order" DROP CONSTRAINT "REL_d1ac459878bdfb0fdf56519231"`);
        await queryRunner.query(`ALTER TABLE "match_order" ADD CONSTRAINT "FK_d1ac459878bdfb0fdf565192318" FOREIGN KEY ("keeperId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match_order" DROP CONSTRAINT "FK_d1ac459878bdfb0fdf565192318"`);
        await queryRunner.query(`ALTER TABLE "match_order" ADD CONSTRAINT "REL_d1ac459878bdfb0fdf56519231" UNIQUE ("keeperId")`);
        await queryRunner.query(`COMMENT ON COLUMN "match_order"."keeperId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "match_order" ADD CONSTRAINT "FK_d1ac459878bdfb0fdf565192318" FOREIGN KEY ("keeperId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

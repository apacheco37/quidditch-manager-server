import {MigrationInterface, QueryRunner} from "typeorm";

export class fixMatchOrderPlayersRelation1636847339774 implements MigrationInterface {
    name = 'fixMatchOrderPlayersRelation1636847339774'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "match_order_chasers_player" ("matchOrderId" integer NOT NULL, "playerId" integer NOT NULL, CONSTRAINT "PK_6e94d48738c5e3e91ea5c317579" PRIMARY KEY ("matchOrderId", "playerId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_30e3f188fbd8641c8fdbf96e8b" ON "match_order_chasers_player" ("matchOrderId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c6b852847e8f5a8efc5480bb10" ON "match_order_chasers_player" ("playerId") `);
        await queryRunner.query(`CREATE TABLE "match_order_beaters_player" ("matchOrderId" integer NOT NULL, "playerId" integer NOT NULL, CONSTRAINT "PK_4bc8e064e5ea69f7b5036ea6fda" PRIMARY KEY ("matchOrderId", "playerId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a9133bbde93372eadd1764b11c" ON "match_order_beaters_player" ("matchOrderId") `);
        await queryRunner.query(`CREATE INDEX "IDX_67da79d3daa24fb2782df727c1" ON "match_order_beaters_player" ("playerId") `);
        await queryRunner.query(`ALTER TABLE "match_order_chasers_player" ADD CONSTRAINT "FK_30e3f188fbd8641c8fdbf96e8b9" FOREIGN KEY ("matchOrderId") REFERENCES "match_order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match_order_chasers_player" ADD CONSTRAINT "FK_c6b852847e8f5a8efc5480bb10c" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match_order_beaters_player" ADD CONSTRAINT "FK_a9133bbde93372eadd1764b11c9" FOREIGN KEY ("matchOrderId") REFERENCES "match_order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match_order_beaters_player" ADD CONSTRAINT "FK_67da79d3daa24fb2782df727c1b" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match_order_beaters_player" DROP CONSTRAINT "FK_67da79d3daa24fb2782df727c1b"`);
        await queryRunner.query(`ALTER TABLE "match_order_beaters_player" DROP CONSTRAINT "FK_a9133bbde93372eadd1764b11c9"`);
        await queryRunner.query(`ALTER TABLE "match_order_chasers_player" DROP CONSTRAINT "FK_c6b852847e8f5a8efc5480bb10c"`);
        await queryRunner.query(`ALTER TABLE "match_order_chasers_player" DROP CONSTRAINT "FK_30e3f188fbd8641c8fdbf96e8b9"`);
        await queryRunner.query(`DROP INDEX "IDX_67da79d3daa24fb2782df727c1"`);
        await queryRunner.query(`DROP INDEX "IDX_a9133bbde93372eadd1764b11c"`);
        await queryRunner.query(`DROP TABLE "match_order_beaters_player"`);
        await queryRunner.query(`DROP INDEX "IDX_c6b852847e8f5a8efc5480bb10"`);
        await queryRunner.query(`DROP INDEX "IDX_30e3f188fbd8641c8fdbf96e8b"`);
        await queryRunner.query(`DROP TABLE "match_order_chasers_player"`);
    }

}

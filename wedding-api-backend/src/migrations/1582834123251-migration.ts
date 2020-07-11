import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1582834123251 implements MigrationInterface {
    name = 'migration1582834123251'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "deletedAt" SET DEFAULT null`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "deletedAt" DROP DEFAULT`, undefined);
    }

}

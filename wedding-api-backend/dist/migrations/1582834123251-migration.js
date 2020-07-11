"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class migration1582834123251 {
    constructor() {
        this.name = 'migration1582834123251';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "deletedAt" SET DEFAULT null`, undefined);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "deletedAt" DROP DEFAULT`, undefined);
    }
}
exports.migration1582834123251 = migration1582834123251;
//# sourceMappingURL=1582834123251-migration.js.map
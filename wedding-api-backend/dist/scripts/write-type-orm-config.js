"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const databases_module_1 = require("../infrastructure/databases/databases.module");
fs.writeFileSync('ormconfig.json', JSON.stringify(databases_module_1.typeOrmConfig, null, 2));
//# sourceMappingURL=write-type-orm-config.js.map
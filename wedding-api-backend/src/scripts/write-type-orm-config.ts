import fs = require('fs');
import { typeOrmConfig } from '../infrastructure/databases/databases.module';
fs.writeFileSync('ormconfig.json', JSON.stringify(typeOrmConfig, null, 2));

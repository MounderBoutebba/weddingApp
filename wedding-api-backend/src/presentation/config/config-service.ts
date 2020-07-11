import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { customLogger } from '../../config/logging';

export class ConfigService {
	private readonly envConfig: { [key: string]: string };

	constructor() {
		customLogger('ConfigService', {
			action: 'init Config Service',
			env_var: process.env.NODE_ENV
		});
		if (!process.env.NODE_ENV) {
			process.env.NODE_ENV = 'production';
		}
		this.envConfig = dotenv.parse(fs.readFileSync(`${process.env.NODE_ENV}.env`));

		
	}

	get(key: string): string {
		return this.envConfig[key];
	}
}

import { ConfigService } from './config-service';

describe('ConfigService', () => {
	it('should be defined', () => {
		expect(new ConfigService()).toBeDefined();
	});

	it('should NODE_ENV to be test', () => {
		expect(process.env.NODE_ENV).toBe('test');
	});
});

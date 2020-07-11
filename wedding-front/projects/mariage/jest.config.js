module.exports = {
	collectCoverage: true,
	coverageReporters: ['html'],
	moduleNameMapper: {
		//"@src/(.*)": '<rootDir>src/$1',
		//"@app/(.*)": '<rootDir>src/app/$1',
	},
	globals: {
		'ts-jest': {
			diagnostics: {
				warnOnly: true
			}
		}
	},
	coverageDirectory: 'coverage/projects/mariage'
};

/* eslint-env node */
'use strict'; // eslint-disable-line

/**
 * Jest configuration.
 */
module.exports = {
	collectCoverage: true,
	collectCoverageFrom: [
		'AsyncTransitionComponent.js'
	],
	coverageDirectory: 'coverage',
	coverageReporters: [
		'html',
		'text-summary'
	],
	setupFiles: [
		'./jest.setup.js'
	]
};

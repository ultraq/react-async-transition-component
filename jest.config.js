/* eslint-env node */
'use strict'; // eslint-disable-line

/**
 * Jest configuration.
 */
module.exports = {
	collectCoverage: true,
	coverageReporters: [
		'html',
		'lcov',
		'text-summary'
	]
};

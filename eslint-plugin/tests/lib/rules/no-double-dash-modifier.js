/**
 * @fileoverview Warns against using the deprecated, double-dash style for BEM notation. See https://releasenotes.docs.salesforce.com/en-us/summer17/release-notes/rn_lds.htm.
 * @author Kevin Gao
 */


//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

let rule = require('../../../lib/rules/no-double-dash-modifier'),
	RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run('no-double-dash-modifier', rule, {
	valid: [
		// give me some code that won't trigger a warning
	],

	invalid: [
		{
			code: '<div className="slds-p-around--medium"/>',
			errors: [
				{
					message: 'Fill me in.',
					type: 'Me too',
				},
			],
		},
	],
});

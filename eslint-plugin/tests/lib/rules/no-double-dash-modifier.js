/**
 * @fileoverview Warns against using the deprecated, double-dash style for BEM
 * notation. See:
 * https://releasenotes.docs.salesforce.com/en-us/summer17/release-notes/rn_lds.htm.
 * @author Kevin Gao
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-double-dash-modifier');
// eslint-disable-next-line import/no-extraneous-dependencies
const RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const parserOptions = {
	ecmaVersion: 6,
	ecmaFeatures: {
		jsx: true,
	},
};

const ruleTester = new RuleTester();
ruleTester.run('no-double-dash-modifier', rule, {
	valid: [
		{
			code: '<div className="slds-p-around_medium"/>',
			parserOptions,
		},
		{
			code: '<div className="slds-p-around_medium slds-m-around_medium"/>',
			parserOptions,
		},
		{
			code: '<div className="some-other-bem--modifier"/>',
			parserOptions,
		},
	],

	invalid: [
		{
			code: '<div className="slds-p-around--medium"/>',
			errors: [
				{
					message:
						'SLDS modifier CSS classes should use a single ' +
						'underscore instead of double-hyphen: ' +
						'"slds-p-around--medium".',
				},
			],
			parserOptions,
		},
		{
			code: '<div className="slds-p-around--medium slds-m-around--medium"/>',
			errors: [
				{
					message:
						'SLDS modifier CSS classes should use a single ' +
						'underscore instead of double-hyphen: ' +
						'"slds-p-around--medium", "slds-m-around--medium".',
				},
			],
			parserOptions,
		},
		{
			code:
				'<div className="another-class slds-p-around--medium and-another"/>',
			errors: [
				{
					message:
						'SLDS modifier CSS classes should use a single ' +
						'underscore instead of double-hyphen: ' +
						'"slds-p-around--medium".',
				},
			],
			parserOptions,
		},
	],
});

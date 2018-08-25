/**
 * @fileoverview Warns against using the deprecated, double-dash style for BEM notation. See https://releasenotes.docs.salesforce.com/en-us/summer17/release-notes/rn_lds.htm.
 * @author Kevin Gao
 */


//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
	meta: {
		docs: {
			description:
				'Warns against using the deprecated, double-dash style for BEM notation. See https://releasenotes.docs.salesforce.com/en-us/summer17/release-notes/rn_lds.htm.',
			category: 'Fill me in',
			recommended: false,
		},
		fixable: null, // or "code" or "whitespace"
		schema: [
			// fill in your schema
		],
	},

	create (context) {
		// variables should be defined here

		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

		// any helper functions should go here or else delete this section

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		return {
			// give me methods
		};
	},
};

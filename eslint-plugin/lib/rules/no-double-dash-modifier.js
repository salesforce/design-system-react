/**
 * @fileoverview Warns against using the deprecated, double-dash style for BEM
 * notation. See:
 * https://releasenotes.docs.salesforce.com/en-us/summer17/release-notes/rn_lds.htm.
 * @author Kevin Gao
 */

//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------

const SLDS_DEPRECATED_CSS_SYNTAX = /\b(slds-[^\s]+)--([^\s]+)/g;

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
	meta: {
		docs: {
			description:
				'Warns against using the deprecated, double-dash style for ' +
				'BEM notation. See:  ' +
				'https://releasenotes.docs.salesforce.com/en-us/summer17/release-notes/rn_lds.htm.',
			category: 'Stylistic Issues',
			recommended: false,
		},
		fixable: 'code',
	},

	create(context) {
		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

		const getFixer = (node) => (fixer) => {
			const { raw } = node;
			const fixedText = raw.replace(SLDS_DEPRECATED_CSS_SYNTAX, '$1_$2');
			return fixer.replaceText(node, fixedText);
		};

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		return {
			Literal(node) {
				const { value } = node;
				if (typeof value !== 'string') {
					return;
				}
				const matches = value.match(SLDS_DEPRECATED_CSS_SYNTAX);
				if (!matches) {
					return;
				}
				const errorClasses = matches
					.map((cssClass) => `"${cssClass}"`)
					.join(', ');
				const message =
					'SLDS modifier CSS classes should use a single ' +
					`underscore instead of double-hyphen: ${errorClasses}.`;
				context.report({
					node,
					message,
					fix: getFixer(node),
				});
			},
		};
	},
};

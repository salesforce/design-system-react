/**
 * @fileoverview Warns against using the deprecated, double-dash style for BEM
 * notation. See:
 * https://releasenotes.docs.salesforce.com/en-us/summer17/release-notes/rn_lds.htm.
 * @author Kevin Gao
 */

//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------

const SLDS_DEPRECATED_CSS_SYNTAX = /\b(slds-[^\s]+)--([^\s]+)?/g;

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

		const getFixer = (node, getValue, getFixRange) => (fixer) => {
			const nodeText = getValue(node);
			const fixedText = nodeText.replace(SLDS_DEPRECATED_CSS_SYNTAX, '$1_$2');
			const range = getFixRange(node);
			return fixer.replaceTextRange(range, fixedText);
		};

		const checkNode = (node, getValue, getFixRange) => {
			const value = getValue(node);
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
				fix: getFixer(node, getValue, getFixRange),
			});
		};

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		return {
			Literal(node) {
				checkNode(
					node,
					(stringNode) => stringNode.value,
					({ start, end }) => [start + 1, end - 1]
				);
			},
			TemplateElement(node) {
				checkNode(
					node,
					(quasi) => quasi.value.raw,
					({ start, end }) => [start, end]
				);
			},
		};
	},
};

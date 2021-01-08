/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
import escapeRegExp from 'lodash.escaperegexp';

/**
 * SLDS recommends auto-complete/search inputs menus have a limit of 10 items.
 */
const filter = ({ inputValue, limit = 10, options, selection }) => {
	const inputValueRegExp = new RegExp(escapeRegExp(inputValue), 'ig');
	// eslint-disable-next-line fp/no-mutating-methods
	return options
		.filter((option) => {
			const searchTermFoundInLabel = option.label
				? option.label.match(inputValueRegExp)
				: false;
			const searchTermFoundInSubtitle = option.subTitle
				? option.subTitle.match(inputValueRegExp)
				: false;
			const isSeparator = option.type === 'separator';
			const notAlreadySelected = !selection.some((sel) => sel.id === option.id);

			return (
				(!inputValue ||
					isSeparator ||
					searchTermFoundInLabel ||
					searchTermFoundInSubtitle) &&
				notAlreadySelected
			);
		})
		.splice(0, limit);
};
export default filter;

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
import escapeRegExp from 'lodash.escaperegexp';

/**
 * SLDS recommends auto-complete/search inputs menus have a limit of 10 items.
 */
const filter = ({ inputValue, limit = 10, options, selection }) =>
	options
		.filter((option) => {
			const searchTermFound = option.label
				? option.label.match(new RegExp(escapeRegExp(inputValue), 'ig'))
				: false;
			const isSeparator = option.type === 'separator';
			const notAlreadySelected = !selection.includes(option);

			return (
				(!inputValue || isSeparator || searchTermFound) && notAlreadySelected
			);
		})
		.splice(0, limit);

export default filter;

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
import escapeRegExp from 'lodash.escaperegexp';

const	filter = ({ options, inputValue, selection }) =>
	options.filter((option) => {
		const searchTermFound = option.label.match(new RegExp(escapeRegExp(inputValue), 'ig'));
		const isSection = option.data && option.data.type === 'section';
		const notAlreadySelected = !selection.includes(option);

		return (
			!inputValue
			|| isSection
			|| searchTermFound
		)
			&& notAlreadySelected;
	});

export default filter;

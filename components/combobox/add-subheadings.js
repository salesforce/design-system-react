/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/**
 * This is a UX pattern recommendation for auto-complete search results that can contain multiple subheadings within the results. It inserts a subheading object based on `option.category === subheading.id` directly before a found option object and only inserts the subheading at the first occurence of that type of option.
 */

const addSubheadings = ({ subheadings, filteredOptions }) => {
	// Let's not mutate things we don't own.
	const subheadingsCopy = [...subheadings];
	const sortedOptions = { noSubHeaderType: [] };

	// populate an object with subheader ID as the keys
	subheadingsCopy.forEach((subH) => {
		if (subH.id) {
			sortedOptions[subH.id] = [subH];
		}
	});

	// sort options into arrays using option category
	// if option category and subheader ID are equal, add to array, if no option category, add to noSubHeaderType array
	filteredOptions.forEach((option) => {
		// `type` held the category before v11; Combobox warns about it in development.
		const category = option.category ?? option.type;
		if (sortedOptions[category]) {
			sortedOptions[category].push(option);
		} else {
			sortedOptions.noSubHeaderType.push(option);
		}
	});

	// get object values by dropping keys
	// flatten and remove child arrays, so that we have one array
	// `...` operates on each array item, not the array
	return [].concat(...Object.values(sortedOptions));
};

export default addSubheadings;

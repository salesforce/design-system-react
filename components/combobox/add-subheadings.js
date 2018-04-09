"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/**
 * This is a UX pattern recommendation for auto-complete search results that can contain multiple subheadings within the results. It inserts a subheading object based on `option.type === subheading.id` directly before a found option object and only inserts the subheading at the first occurence of that type of option.
 */

var addSubheadings = function addSubheadings(_ref) {
	var _ref2;

	var subheadings = _ref.subheadings,
	    filteredOptions = _ref.filteredOptions;

	// Let's not mutate things we don't own.
	var subheadingsNotPresent = [].concat(_toConsumableArray(subheadings));

	var filteredOptionsWithSubheadings = filteredOptions.map(function (option) {
		var subheadingRelatedToFilteredOption = void 0;

		// Remove subheadings that have been found from
		// `subheadingsNotPresent` and flag if they are
		// found.
		subheadingsNotPresent = subheadingsNotPresent.filter(function (subheading) {
			var subheadingNotPresentInFilteredOptions = true;
			if (option.type === subheading.id) {
				subheadingRelatedToFilteredOption = subheading;
				subheadingNotPresentInFilteredOptions = false;
			}
			return subheadingNotPresentInFilteredOptions;
		});

		// So that they can be inserted into the current filtered
		// options in a child array with the first related option
		// OUTPUT
		// Array [
		//   0: Array [
		//     0: {id: "account", label: "Accounts", type: "separator"}
		//     1: {id: "1", label: "Acme", type: "account"}
		//   ]
		// ]
		return subheadingRelatedToFilteredOption ? [subheadingRelatedToFilteredOption, option] : [option];
	});

	// flatten and remove child arrays, so that we have one array
	// `...` operates on each array item, not the array
	return (_ref2 = []).concat.apply(_ref2, _toConsumableArray(filteredOptionsWithSubheadings));
};

exports.default = addSubheadings;
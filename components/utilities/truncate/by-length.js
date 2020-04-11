/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

export default function truncateByLength({
	inputString = '',
	maxLength = 140,
	truncationChars = '...',
	startingLength = 0,
}) {
	let outputString;

	if (inputString.length <= maxLength) {
		outputString = inputString;
	} else {
		const words = inputString.split(' ');
		let length = startingLength + truncationChars.length - 1;

		outputString = words
			.reduce((combined, word) => {
				length += word.length + 1;

				if (length <= maxLength) {
					// eslint-disable-next-line fp/no-mutating-methods
					combined.push(word);
				}

				return combined;
			}, [])
			.join(' ');

		outputString += truncationChars;
	}

	return outputString;
}

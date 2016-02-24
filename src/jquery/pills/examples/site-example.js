import {Lib, Pills} from 'design-system-jquery';

import $ from 'jquery';

// SAMPLE CONTROL CODE -->

$(function () {
	const pillsProperties = {
		selection: [
			{
				text: 'item 1', value: 1
			}, {
				text: 'item 2', value: 2
			}, {
				text: 'item 3', value: 3
			}
		]
	};

	const pills = new Pills($('#pills__pills--0'), pillsProperties);
	void (pills);
});

// <-- SAMPLE CONTROL CODE

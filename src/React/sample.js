import React from 'react';
import Page from './page';

var element = document.getElementById('selectlist');

var collection = [
	{ id: 0, name: 'tacos', type: 'mexican' },
	{ id: 1, name: 'burrito', type: 'mexican' },
	{ id: 2, name: 'tostada', type: 'mexican' },
	{ id: 3, name: 'hush puppies', type: 'southern' }
];

// TO-DO: Rewrite this to a sample that is more real-life
// For example, this could be a collection of people and their food preference rather than a perfect set of models
var models = {
	selectlist1: {
		collection: collection,
		disabled: false,
		selection: collection[0],
		resize: 'auto'
	},
	selectlist2: {
		collection: collection,
		disabled: false,
		selection: { name: 'tostada' }
	},
	selectlist3: {
		collection: collection,
		disabled: false,
	},
	selectlist4: {
		collection: collection,
		disabled: true
	}
};

// Page is a list of multiple selectlists
React.render(<Page models={models}/>, element, () => {});
import {Landmark} from '../landmark';
import React from 'react';
import Page from './page';
import {Selectlist} from './selectlist';

var element = document.getElementById('selectlist-react');
var collection = [
	{ id: 0, name: 'tacos', type: 'mexican' },
	{ id: 1, name: 'burrito', type: 'mexican' },
	{ id: 2, name: 'tostada', type: 'mexican' },
	{ id: 3, name: 'hush puppies', type: 'southern' }
];

var models = {
	selectlist1: {
		collection: collection,
		disabled: false,
		selection: collection[0]
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
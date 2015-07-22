import {Landmark} from '../Landmark';
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

var superModel = {
	selectlist1: {
		collection: collection,
		disabled: false,
		selection: collection[0]
	},
	selectlist2: {
		collection: collection,
		disabled: true,
		selection: null
	},
	selectlist3: {
		collection: collection,
		disabled: false,
		selection: { name: 'tostada' }
	},
	selectlist4: {
		collection: collection,
		disabled: false
	}
}

// Page is a list of multiple selectlists
React.render(<Page model={superModel}/>, element, () => {});
import React from 'react';
import Page from './page';

var element = document.getElementById('selectlist-react');
var collection = [
		{ id: 0, name: 'tacos', type: 'mexican' },
		{ id: 1, name: 'burrito', type: 'mexican' },
		{ id: 2, name: 'tostada', type: 'mexican' },
		{ id: 3, name: 'hush puppies', type: 'southern' }
	];

var superCollection = {
	selectlist1: collection,
	selectlist2: collection,
	selectlist3: collection,
	selectlist4: collection
}

// Page is a list of multiple selectlists
React.render(<Page collection={superCollection}/>, element, () => {});
var React = require('react');
var Selectlist = require('./selectlist');

// state and model of sample selectlist
var collection = {
	selected: 'None selected',
	id: 'selectlist1',
	items: [
		{ id: 0, name: 'tacos', type: 'mexican' },
		{ id: 1, name: 'burrito', type: 'mexican' },
		{ id: 2, name: 'tostada', type: 'mexican' },
		{ id: 3, name: 'hush puppies', type: 'southern' }
	],
	options: {
		// add display options here
	}
};

React.render(React.createElement(Selectlist, {
		model: collection
	}), document.getElementById('sampleSelectlist'));
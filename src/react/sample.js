import React from 'react';
import Selectlist from './selectlist';
import Tree from './tree';

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

var Page = React.createClass({
	changeCollection () {
		var models = this.props.models;
		Object.keys(models).forEach(key => {
			models[key].disabled = !models[key].disabled;
		});

		this.setProps({
			models: models
		});
	},

	getSelectionHandler (model) {
		return function (selection) {
			model.selection = selection;
		}
	},

	render () {
		var selectlists = [];
		
		Object.keys(this.props.models).forEach(key => {
			this.props.models[key].onSelected = this.getSelectionHandler(this.props.models[key]);
			selectlists.push(
				<li>{React.createElement(Selectlist, this.props.models[key])}</li>
			);
		});

		return (
			<div>
				<ul className="selectlist-examples">
					{selectlists}
				</ul>

				<button className="selectlist-action btn btn-primary" onClick={this.changeCollection}>Toggle Enabled / Disabled</button>
			</div>
		);
	}
});

// Page is a list of multiple selectlists
React.render(<Page models={models}/>, element, () => {});
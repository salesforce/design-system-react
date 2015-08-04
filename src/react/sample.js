import React from 'react';
import Selectlist from './selectlist';

var element = document.getElementById('selectlist');

var collection = [
	{ id: 0, name: 'One', value: '1'  },
	{ id: 1, name: 'Two', value: '2'  },
	{ id: 2, name: 'Three', value: '3'  },
	{ id: 3, name: 'Buzz', value: '4'  },
	{ id: 4, name: 'Item Five', value: 'Item Five', fizz: 'buzz', foo: 'bar'  },
	{ id: 5, name: 'A Disabled Item', disabled: true, value: 'disabled' }
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
		selection: { name: 'Buzz' }
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
	
	logSelectedItem (key) {
		// Okay, probably wouldn't do this in React but just demonstrating
		console.log(this.refs[key].getSelection());
	},
	
	setSelection (key) {
		models[key].selection = { value: '2' };
		this.forceUpdate();
	},
	
	enable (key) {
		models[key].disabled = false;
		this.forceUpdate();
	},
	
	disable (key) {
		models[key].disabled = true;
		this.forceUpdate();
	},

	render () {
		var selectlists = [];
		
		// TO-DO: This isn't the most "React-y" example
		Object.keys(this.props.models).forEach(key => {
			var self = this;
			var model = this.props.models[key];
			model.onSelected = this.getSelectionHandler(model);
			model.ref = key;
			
			selectlists.push(
				<section className="{key} example-group" key={key}>
					<h1>Selectlist example ({key})</h1>
					
					<div className="selectlist-example">{React.createElement(Selectlist, model)}</div>
					
					<div className="btn-panel selectlist-action">
						<button className="btn btn-default" onClick={self.logSelectedItem.bind(this, key)}>log selected item</button>
						<button className="btn btn-default" onClick={self.setSelection.bind(this, key)}>set by value ('2')</button>
						<button className="btn btn-default" onClick={self.enable.bind(this, key)}>enable</button>
						<button className="btn btn-default" onClick={self.disable.bind(this, key)}>disable</button>
					</div>
				</section>
			);
		});

		return (
			<div>
				{selectlists}
				<button className="selectlist-action btn btn-primary" onClick={this.changeCollection}>Toggle Enabled / Disabled</button>
			</div>
		);
	}
});

// Page is a list of multiple selectlists
React.render(<Page models={models}/>, element, () => {});
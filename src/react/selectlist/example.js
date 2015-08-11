import Lib from '../../core/lib';
import React from 'react';
import Selectlist from './selectlist';

export default function (element) {
	const collection = [
		{ _itemType: 'header', name: 'One thing' },
		{ id: 0, name: 'One', value: '1' },
		{ _itemType: 'divider' },
		{ _itemType: 'header', name: 'All the things' },
		{ id: 1, name: 'Two', value: '2' },
		{ _itemType: 'item', id: 2, name: 'Three', value: '3'  },
		{ id: 3, name: 'Buzz', value: '4'  },
		{ id: 4, name: 'Item Five', value: 'Item Five', fizz: 'buzz', foo: 'bar'  },
		{ id: 5, name: 'A Disabled Item', disabled: true, value: 'disabled' }
	];

	// TO-DO: Rewrite this to a sample that is more real-life
	// For example, this could be a collection of people and their food preference rather than a perfect set of models
	const models = {
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
			disabled: false
		},
		selectlist4: {
			collection: collection,
			disabled: true
		}
	};

	const SelectlistExample = React.createClass({
		propTypes: {
			models: React.PropTypes.arrayOf(React.PropTypes.object)
		},

		getSelectionHandler (model) {
			return function selectionHandler (selection) {
				model.selection = selection;
			};
		},

		render () {
			const selectlists = [];

			// TO-DO: This isn't the most "React-y" example
			Object.keys(this.props.models).forEach(key => {
				const self = this;
				const model = this.props.models[key];
				
				model.onSelected = this.getSelectionHandler(model);
				model.ref = key;

				selectlists.push(
					<section className="example-group" key={key}>
						<h1>Selectlist example ({key})</h1>

						<div className="example">{React.createElement(Selectlist, model)}</div>

						<div className="btn-panel action">
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
					<button className="action btn btn-primary" onClick={this.changeCollection}>Toggle Enabled / Disabled</button>
				</div>
			);
		},

		changeCollection () {
			const props = this.props;

			Object.keys(props.models).forEach(key => {
				props.models[key].disabled = !props.models[key].disabled;
			});

			this.setProps({
				models: props.models
			});
		},

		logSelectedItem (key) {
			// Okay, probably wouldn't do this in React but just demonstrating
			Lib.log(this.refs[key].getSelection());
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
		}
	});

	// Page is a list of multiple selectlists
	React.render(<SelectlistExample key={'SelectlistExample'} models={models}/>, element);
}

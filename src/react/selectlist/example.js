import * as Lib from '../../core/lib';
import React from 'react';
import Selectlist from './selectlist';

export default function (element) {
	const collection = [
		{ _itemType: 'header', text: 'One thing' },
		{ id: 0, text: 'One', value: '1' },
		{ _itemType: 'divider' },
		{ _itemType: 'header', text: 'All the things' },
		{ id: 1, text: 'Two', value: '2' },
		{ id: 2, text: 'Three', value: '3'  },
		{ id: 3, text: 'Buzz', value: '4'  },
		{ id: 4, text: 'Item Five', value: 'Item Five', fizz: 'buzz', foo: 'bar'  },
		{ id: 5, text: 'A Disabled Item', disabled: true, value: 'disabled' }
	];

	const SelectlistExample = React.createClass({
		propTypes: {
			models: React.PropTypes.arrayOf(React.PropTypes.object)
		},

		getInitialState () {
			return {
				models: [
					{
						collection: collection,
						disabled: false,
						selection: collection[1],
						resize: 'auto'
					},
					{
						collection: collection,
						disabled: false,
						selection: collection[6]
					},
					{
						collection: collection,
						disabled: false
					},
					{
						collection: collection,
						disabled: true
					}
				]
			};
		},

		getSelectionHandler (model) {
			return function selectionHandler (selection) {
				model.selection = selection;
			};
		},

		render () {
			const selectlists = this.state.models.map((model, index) => {
				model.onChanged = this.getSelectionHandler(model);

				return (
					<section className="example-group" key={index}>
						<h1>Selectlist example (selectlist{index + 1})</h1>

						<div className="example">
							<Selectlist {...model} onChanged={this._handleModelChange.bind(this, index)}/>
						</div>

						<div className="btn-panel action">
							<button className="btn btn-default" onClick={this.logSelectedItem.bind(this, index)}>log selected item</button>
							<button className="btn btn-default" onClick={this.setSelection.bind(this, index)}>set by object</button>
							<button className="btn btn-default" onClick={this.enable.bind(this, index)}>enable</button>
							<button className="btn btn-default" onClick={this.disable.bind(this, index)}>disable</button>
						</div>
					</section>
				);
			});

			return (
				<div>
					{selectlists}
					<button className="action btn btn-primary" onClick={this.toggleSelectlistsEnabled}>Toggle Enabled / Disabled</button>
				</div>
			);
		},

		_handleModelChange (index, selection) {
			const models = this.state.models;
			models[index].selection = selection;
			this.setState({models});
		},

		toggleSelectlistsEnabled () {
			this.setState({
				models: this.state.models.map(model => {
					model.disabled = !model.disabled;
					return model;
				})
			});
		},

		logSelectedItem (index) {
			Lib.log(this.state.models[index].selection);
		},

		setSelection (index) {
			const models = this.state.models;
			// Note: React requires you to set a complete object because it doesn't run the setSelection code when you update state
			// TO-DO: Make sure this pattern is appropriate
			models[index].selection = collection[5];
			this.setState({models});
		},

		enable (index) {
			const models = this.state.models;
			models[index].disabled = false;
			this.setState({models});
		},

		disable (index) {
			const models = this.state.models;
			models[index].disabled = true;
			this.setState({models});
		}
	});

	React.render(<SelectlistExample />, element);
}

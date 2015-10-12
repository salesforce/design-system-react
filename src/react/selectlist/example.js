import * as Lib from '../../lib/lib';
import React from 'react';
import Selectlist from './selectlist';

export default function (element) {
	const collection = [
		{ _itemType: 'header', text: 'One thing' },
		{ id: 0, text: 'One', value: '1' },
		{ _itemType: 'divider' },
		{ _itemType: 'header', text: 'All the things' },
		{ id: 1, text: 'Two', value: '2' },
		{ id: 6, text: 'Taste', value: '2' },
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
						disabled: false,
						resize: 'auto'
					},
					{
						collection: collection,
						disabled: true
					}
				]
			};
		},

		render () {
			const selectlists = this.state.models.map((model, index) => {
				return (
					<section className="example-group" key={index}>
						<h1 className="slds-text-heading--large">Selectlist example (selectlist{index + 1})</h1>

						<div className="example">
							<Selectlist {...model} onChanged={this._handleModelChange.bind(this, index)}/>
						</div>

						<div className="slds-button-group">
							<button className="slds-button slds-button--neutral" onClick={this.logSelectedItem.bind(this, index)}>log selected item</button>
							<button className="slds-button slds-button--neutral" onClick={this.setSelection.bind(this, index)}>set by object</button>
							<button className="slds-button slds-button--neutral" onClick={this.enable.bind(this, index)}>enable</button>
							<button className="slds-button slds-button--neutral" onClick={this.disable.bind(this, index)}>disable</button>
						</div>
					</section>
				);
			});

			return (
				<div>
					{selectlists}
					<button className="slds-button slds-button--brand" onClick={this.toggleSelectlistsEnabled}>Toggle Enabled / Disabled</button>
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

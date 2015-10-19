import * as Lib from '../../lib/lib';
import React from 'react';
import ReactDOM from 'react-dom';
import Combobox from './combobox';

export default function () {
	const collection = [
		{_itemType: 'header', text: 'One thing'},
		{id: 0, text: 'One', value: '1'},
		{_itemType: 'divider'},
		{_itemType: 'header', text: 'All the things'},
		{id: 1, text: 'Two', value: '2'},
		{id: 6, text: 'Taste', value: '2'},
		{id: 2, text: 'Three', value: '3'},
		{id: 3, text: 'Buzz', value: '4'},
		{id: 4, text: 'Item Five', value: 'Item Five', fizz: 'buzz', foo: 'bar'},
		{id: 5, text: 'A Disabled Item', disabled: true, value: 'disabled'}
	];

	const ComboboxExample = React.createClass({
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
					}
				]
			};
		},

		render () {
			const comboboxen = this.state.models.map((model, index) => {
				return (
					<div key={index}>
						<div className="slds-col example">
							<div>
								<Combobox {...model} onChanged={this._handleModelChange.bind(this, index)}/>
							</div>
						</div>
						<div className="slds-col demo-controls">
							<div className="slds-button-group" role="group">
								<button type="button" className="slds-button slds-button--neutral slds-button--xsmall" onClick={this.logSelectedItem.bind(this, index)}>Log selected item</button>
								<button type="button" className="slds-button slds-button--neutral slds-button--xsmall" disabled>Set by index</button>
								<button type="button" className="slds-button slds-button--neutral slds-button--xsmall" onClick={this.setSelection.bind(this, index)}>Set by object</button>
								<button type="button" className="slds-button slds-button--neutral slds-button--xsmall" onClick={this.enable.bind(this, index)}>Enable</button>
								<button type="button" className="slds-button slds-button--neutral slds-button--xsmall" onClick={this.disable.bind(this, index)}>Disable</button>
							</div>
						</div>
					</div>
				);
			});

			return (
				<div>
					{comboboxen}
				</div>
			);
		},

		_handleModelChange (index, selection) {
			const models = this.state.models;
			models[index].selection = selection;
			this.setState({models});
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

	ReactDOM.render(<ComboboxExample />, document.getElementById('combobox-react-control'));
}

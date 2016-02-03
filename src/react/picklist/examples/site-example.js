import React             from 'react';
import { Lib, Picklist } from 'design-system-react';

// SAMPLE CONTROL CODE -->

const PicklistExample = React.createClass({
	propTypes: {
		modal: React.PropTypes.bool
	},

	getInitialState () {
		const resize = 'auto';
		const selection = {
			value: 1
		};
		const collection = [
			{
				_itemType: 'header', text: 'One thing'
			}, {
				id: 0, text: 'One', value: '1', icon: 'utility.apps'
			}, {
				_itemType: 'divider'
			}, {
				_itemType: 'header', text: 'All the things'
			}, {
				id: 1, text: 'Two', value: '2', icon: 'utility.email'
			}, {
				id: 2, text: 'Three', value: '3'
			}, {
				id: 3, text: 'Buzz', value: '4'
			}, {
				id: 4, text: 'Item Five', value: 'Item Five', fizz: 'buzz', foo: 'bar'
			}, {
				id: 5, text: 'A Disabled Item', disabled: true, value: 'disabled'
			}
		];

		const picklistSampleData = {
			collection: collection,
			resize: resize,
			selection: selection
		};

		return {
			models: [
				{
					collection: picklistSampleData.collection,
					disabled: false,
					selection: picklistSampleData.collection[1]
				}
			]
		};
	},

	render () {
		const picklists = this.state.models.map((model, index) => {
			return (
				<div key={index}>
					<div className="slds-col example">
						<Picklist
							{...model}
							modalMenu={this.props.modal}
							onChange={this._handleModelChange.bind(this, index)} />
					</div>
					<div className="slds-col demo-controls">
						<div className="slds-button-group" role="group">
							<button type="button" className="slds-button slds-button--neutral slds-button--small" onClick={this.logSelectedItem.bind(this, index)}>Log selected item</button>
							<button type="button" className="slds-button slds-button--neutral slds-button--small" disabled>Set by index</button>
							<button type="button" className="slds-button slds-button--neutral slds-button--small" onClick={this.setSelection.bind(this, index)}>Set by object</button>
							<button type="button" className="slds-button slds-button--neutral slds-button--small" onClick={this.enable.bind(this, index)}>Enable</button>
							<button type="button" className="slds-button slds-button--neutral slds-button--small" onClick={this.disable.bind(this, index)}>Disable</button>
						</div>
					</div>
				</div>
			);
		});

		return (
			<div>
				{picklists}
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
		models[index].selection = this.state.models.collection[5];
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

// <-- SAMPLE CONTROL CODE

export default PicklistExample;

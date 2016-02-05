import React             from 'react';
import { Lib, Dropdown } from 'design-system-react';

// SAMPLE CONTROL CODE -->


const DropdownExample = React.createClass({
	propTypes: {
		models: React.PropTypes.arrayOf(React.PropTypes.object)
	},

	getInitialState () {
		const selection = {
			value: 1
		};

		const collection = [
			{
				id: 0, text: 'Menu Item One', value: '1', icon: 'utility.table'
			}, {
				id: 1, text: 'Menu Item Two', value: '2', icon: 'utility.kanban'
			}, {
				id: 2, text: 'Menu Item Three', value: '3', icon: 'utility.side_list'
			}
		];

		const dropdownSampleData = {
			selection: selection,
			collection: collection
		};

		return {
			models: [
				{
					collection: dropdownSampleData.collection,
					disabled: false,
					selection: dropdownSampleData.collection[dropdownSampleData.selection.value]
				}
			]
		};
	},

	render () {
		const dropdowns = this.state.models.map((model, index) => {
			return (
				<div key={index}>
					<div className="slds-col example">
						<Dropdown {...model} onChange={this._handleModelChange.bind(this, index)} />
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
				{dropdowns}
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
		models[index].selection = models.collection.Array[3];
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

export default DropdownExample;
